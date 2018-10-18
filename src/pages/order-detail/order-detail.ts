import { AddressPage } from './../address/address';
import { LoginPage } from './../login/login';
import { OrderSuccessPage } from './../order-success/order-success';
import { LoadingController, ViewController, AlertController, ModalController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { GoodsInfoOrder } from './../../common/class/goodsInfoOrder';
import { GoodsSpec } from './../../common/class/goodsSpec';
import { Storage } from '@ionic/storage';
import { RestProvider } from './../../providers/rest/rest';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { BaseUI } from '../../common/baseui';

/**
 * Generated class for the OrderDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare let cordova:any;
@IonicPage()
@Component({
  selector: 'page-order-detail',
  templateUrl: 'order-detail.html',
})
export class OrderDetailPage extends BaseUI{
public consignee: string = '';
public mobile: string = '';
public address: string = '';
public userId: string = '';
public choosenSpec: GoodsSpec;
public goodsId: string;
public goodsName: string = '';
public goodsImg: string = '';
public priceTotal: number = 0.0;
public addressId: number = 0;
public goodsInfoOrder: GoodsInfoOrder[] = new Array();
public goodsIds: number[];
public userNote: string = '';
public orderId: number = 0;
public orderNo: string;
public orderPrice: string;
private orderType: string = '';
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private rest: RestProvider,
    private storage: Storage,
    private actionsheetCtrl: ActionSheetController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private viewCtrl: ViewController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) {
   super();
    this.orderType = this.navParams.get('orderType')?this.navParams.get('orderType'):'normal';
    console.log(this.orderType);
    switch(this.orderType){
      case 'cart':
      let cartIds = this.navParams.get('cartIds');
      this.rest.getCartListByCartIds(cartIds).subscribe(
        (res)=>{
          console.log(res);
          this.priceTotal = res['total_price']['total_fee'];
          res['cartList'].map(
            (val)=>{
              let tempArr = new GoodsInfoOrder;
              tempArr['goodsId'] = val['goods_id'];
              tempArr['goodsImg'] = val['original_img'];
              tempArr['goodsPrice'] = val['goods_price'];
              tempArr['goodsNum'] = val['goods_num'];
              tempArr['goodsName'] = val['goods_name'];
              tempArr['goodsChoosenSpec'] = val['spec_item_key'];
              tempArr['goodsSpecStr'] = val['spec_item_name'];
              this.goodsInfoOrder.push(tempArr);
            }
          )
        
          
        },
        (error)=>{
          console.log(error);
        }
      )
    
      break;
      default:
      this.goodsInfoOrder = this.navParams.get('goodsInfo');
     
     
      if(this.goodsInfoOrder.length > 0){
        for(let i in this.goodsInfoOrder){
          this.priceTotal += Number(this.goodsInfoOrder[i]['goodsPrice']) * Number(this.goodsInfoOrder[i]['goodsNum']);
        }
      }
      break;
    }
   
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderDetailPage');
    
    
  }

  ionViewWillEnter(){
    this.storage.get('userId').then(
      (val)=>{
        if(!val){
          super.showToast(this.toastCtrl,'请先登陆');
          this.navCtrl.push(LoginPage);
        }else{
          this.userId = val;
        }
      }
    );
    this.getUserAddressDefault(this.addressId);
  }


  public getUserAddressDefault(addressId){
    let loading = super.showLoading(this.loadingCtrl,'加载中');
    this.storage.get('userId').then(
      (val)=>{
        if(val){
          this.userId = val;
          this.rest.getUserAddressDefault(val,addressId).subscribe(
            (res)=>{
              console.log(res);
              loading.dismiss();
              if(res){
               
                this.addressId = res['address_id'];
                this.consignee = res['consignee'];
                this.mobile = res['mobile'];
                this.address = res['address'];
              }else{
                
                let alert = this.alertCtrl.create({
                  title:'没有收货地址',
                  subTitle:'亲，您还没有填写默认的收货地址哦，请先添加一个默认收货地址才可以下单哦',
                  buttons:[{
                    text:'添加收货地址',
                    handler: data=>{
                      this.navCtrl.push(AddressPage,{isOrder:true});
                    }
                  }]
                });
                alert.present();
              }
            },
            (error)=>{
              loading.dismiss();
              console.log(error);
            }
          );
        }
      }
    );
  }

  public openPayStyle(){
  //  加入订单与后台配合
    console.log(this.goodsInfoOrder,this.userNote);
    
    let loading = super.showLoading(this.loadingCtrl,'提交订单中...');
   
    let actionSheet = this.actionsheetCtrl.create({
      title:'请选择支付方式',
      cssClass: 'order-detail.scss',
      buttons: [
        {
          text: '支付宝支付',
          role: 'destructive',
          icon: null,
          handler: ()=>{
             this.rest.getAlipayOrder(this.orderId).subscribe(
               (res)=>{
                //  cordova plugin add cordova-plugin-alipay-v2 --variable APP_ID=2017102809577451
                let that = this;
                 cordova.plugins.alipay.payment(res,
                   function success(e) {
                     //支付成功
                     if (e.resultStatus == "9000") {
                       that.hasPayOrder(that.orderId,'hasPay',that.userId);
                       that.navCtrl.push(OrderSuccessPage, { orderId: that.orderId });
                     } else {
                       let toast = that.toastCtrl.create({
                         message: e.memo,
                         duration: 1000,
                         position: 'middle'
                       });
                       toast.present();
                     }
                   },
                   function error(e) {

                   });
               } 
             );
          }
        }
      ]
    });
    try{
      this.rest.addOrder(this.userId,this.addressId,this.userNote,this.goodsInfoOrder).subscribe(
        (res)=>{
          loading.dismiss();
          console.log(res);
          if(res['status']){
            this.orderId = res['result'];
            actionSheet.present();
          }else{
            super.showToast(this.toastCtrl,res['msg']);
          }
        
        },
        (error)=>{
          console.log(error);
        }
      );
    }catch(e){
      console.log(e);
    }
   
     
  }

  private hasPayOrder(orderId,status ,userId){
    this.rest.updateOrderStatus(orderId,status,userId).subscribe();
  }

  public gotoAddress(){
      let addressChoosen = this.modalCtrl.create(AddressPage,{isOrder: true});
      addressChoosen.onDidDismiss(data=>{
        this.addressId = data['addressId']?data['addressId']:0;
        this.getUserAddressDefault(this.addressId);
      });
      addressChoosen.present();
  }
}
