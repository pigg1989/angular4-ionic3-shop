import { RestProvider } from './../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { TabsPage } from './../tabs/tabs';

import { OrderSdetailPage } from './../order-sdetail/order-sdetail';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the OrderSuccessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-success',
  templateUrl: 'order-success.html',
})
export class OrderSuccessPage {
  public orderId: number = 0;
  public orderNo: string = '';
  public orderPrice: string = '';
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private storage: Storage,
    private rest: RestProvider
  ) {
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderSuccessPage');
  }
  ionViewWillEnter(){
    /* 
    orderId: that.orderId, orderNo: that.orderNo, orderPrice: that.orderPrice
    */
    this.orderId = this.navParams.get('orderId') ? this.navParams.get('orderId'): 0;
    this.storage.get('userId').then(
      (val)=>{
        if(val){
          this.rest.getBasicOrderInfo(val,this.orderId).subscribe(
            (res)=>{
              console.log(res);
              if(res){
                this.orderNo = res['order_sn'];
                this.orderPrice = res['total_amount'];
              }
            }
          )
        }
      }
    )
   
    console.log(this.orderId, this.orderNo, this.orderPrice);
  }
  public orderSdetails(orderId){
    this.navCtrl.push(OrderSdetailPage);
  }
 
  public gotoHome(){
   
    this.navCtrl.push(TabsPage);
  }

}
