import { OrderSuccessPage } from './../order-success/order-success';
import { LoadingController, ToastController, AlertController, ActionSheetController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { BaseUI } from '../../common/baseui';

/**
 * Generated class for the OrderListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare let cordova: any;
@IonicPage()
@Component({
  selector: 'page-order-list',
  templateUrl: 'order-list.html',
})
export class OrderListPage extends BaseUI{
  public type: string;
  public orderList: string[] = new Array();
  public userId: string = '';
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public rest: RestProvider,
    private storage: Storage,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private actionsheetCtrl: ActionSheetController
  ) {
    super();
    this.type = this.navParams.get('type');
    console.log(this.type);
  }

  /**
   * typeId: 1/待付款WAITPAY 2/待发货WAITSEND 3/待收货WAITRECEIVE 4/已完成WAITCCOMMENT
   * 
   * @memberof OrderListPage
   */
  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderListPage');
    let loading = super.showLoading(this.loadingCtrl,'加载中....');
    this.getOrderList(this.type);
    setTimeout(() => {
      loading.dismiss();
    }, 1000);
  }

  ionViewWillEnter(){
    this.storage.get('userId').then(
      (val)=>{
        if(val){
          this.userId = val;
        }else{
          this.userId = '';
        }
      }
    )
  }
  public getOrderList(type){
    this.storage.get('userId').then(
      (val)=>{
        this.rest.getOrderList(type,val,this.orderList.length).subscribe(
          (res)=>{
            res.map((i)=>{
              this.orderList.push(i);
            });
            console.log(this.orderList);
          }
        );
      }
    );

  } 

  public cancelOrder(orderId){
    let confirm = this.alertCtrl.create({
      title: '确认删除吗?',
      message: '是否确认删除该信息?',
      buttons: [
        {
          text: '取消',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: '确定',
          handler: () => {
            console.log('Agree clicked');
            this.storage.get('userId').then(
              (val)=>{
                console.log(val,orderId);
               
                this.rest.cancelOrder(val,orderId).subscribe(
                  (res)=>{
                    if(res['status'] == 1){
                     for(let i=0;i<this.orderList.length;i++){
                        if(this.orderList[i]['order_id'] == orderId){
                          console.log('角标'+i);
                          this.orderList.splice(i,1);
                          super.showToast(this.toastCtrl,res['msg']);
                        }
                     }
                    }else{
                      super.showToast(this.toastCtrl,res['msg']);
                    }
                  }
                );
              }
            );
          }
        }
      ]
    });
    confirm.present();
    
  }

  public gotoPay(orderId){
    let actionSheet = this.actionsheetCtrl.create({
      title:'请选择支付方式',
      cssClass: 'order-detail.scss',
      buttons: [
        {
          text: '支付宝支付',
          role: 'destructive',
          icon: null,
          handler: ()=>{
             this.rest.getAlipayOrder(orderId).subscribe(
               (res)=>{
               
                //  cordova plugin add cordova-plugin-alipay-v2 --variable APP_ID=2017102809577451
                let that = this;
                cordova.plugins.alipay.payment(res,
                  function success(e){
                    //支付成功
                    if (e.resultStatus == "9000"){
                      that.hasPayOrder(orderId);
                      that.navCtrl.push(OrderSuccessPage, { orderId: orderId });
                    }else{
                      let toast = that.toastCtrl.create({
                        message: e.memo,
                        duration: 1000,
                        position: 'middle'
                      });
                      toast.present();
                    }
                  },
                  function error(e){
                   
                  });
               } 
             );
          } 
        }
      ]
    });

    actionSheet.present();
  }

  private hasPayOrder(orderId){
    this.rest.updateOrderStatus(orderId,'hasPay',this.userId).subscribe();
  }

  public confirmOrder(orderId){
    let confirm = this.alertCtrl.create({
      title: '确认收货吗?',
      message: '是否确认已经收到该宝贝?',
      buttons: [
        {
          text: '取消',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: '确认',
          handler: () => {
            this.rest.updateOrderStatus(orderId, 'confirm', this.userId).subscribe(
              (res)=>{
                if (res['status'] == 1) {
                  for (let i = 0; i < this.orderList.length; i++) {
                    if (this.orderList[i]['order_id'] == orderId) {
                      console.log('角标' + i);
                      this.orderList.splice(i, 1);
                      super.showToast(this.toastCtrl, res['msg']);
                    }
                  }
                } else {
                  super.showToast(this.toastCtrl, res['msg']);
                }
              }
            );
          }
        },
      ]});
    confirm.present();
  }
}
