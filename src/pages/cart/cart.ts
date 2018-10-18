import { OrderDetailPage } from './../order-detail/order-detail';
import { RestProvider } from './../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { Device } from '@ionic-native/device';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  public userId: string;
  public cartList: string[] = new Array();
  public uuid: string = '';
  public totalFee: number = 0.00;
  public totalNum: number = 0;
  public all: boolean = true;
  public cartIds: number[] = new Array();
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private device: Device,   
    private storage: Storage,
    private rest: RestProvider,
    
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
    // console.log(this.device.uuid);
    this.uuid = this.device.uuid;
   
  }

  ionViewWillEnter(){
    
    //检查购物车
    this.storage.get('userId').then(
      (val)=>{
        this.userId = val?val:null;
        console.log(this.userId);
        if(this.userId || this.uuid){
          this.rest.getCartList(this.userId,this.uuid).subscribe(
            (res)=>{
              console.log(res);
              this.cartList = res['cartList'];
              this.totalFee = res['total_price']['total_fee'];
              this.totalNum = res['total_price']['num'];
              console.log(this.cartList);
            }
          );
        }
        
      }
    )
    
  }

  public updateSum(i){
    if(this.cartList[i]['selected']){
      this.totalFee = this.totalFee + Number(this.cartList[i]['goods_price']);
      this.totalNum = this.totalFee + Number(this.cartList[i]['goods_num']);
    }else{
      this.totalFee = this.totalFee - this.cartList[i]['goods_price'];
      this.totalNum = this.totalFee - this.cartList[i]['goods_num'];
    }
    this.changeAll();
  }

  public selectAll(){
    if(this.all){
      this.cartList.map((val)=>{
        val['selected'] = true;
      })
    }else{
      this.cartList.map((val)=>{
        val['selected'] = false;
      })
    }
  }

  private changeAll(){
    this.all = true;
    this.cartList.map((val)=>{
      this.all = this.all && val['selected'];
  });
  }

  public gotoOrderDetail(){
    this.cartIds = new Array();
    this.cartList.map((val)=>{
      if(val['selected']){
        this.cartIds.push(val['id']);
      }
    });
    this.navCtrl.push(OrderDetailPage,{cartIds:this.cartIds,orderType:'cart'});
  }

  public delCart(goodsId){
    console.log(goodsId);
  }
}
