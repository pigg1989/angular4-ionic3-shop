import { RechargePage } from './../recharge/recharge';
import { WithdrawPage } from './../withdraw/withdraw';
import { ToastController } from 'ionic-angular';
import { PointsPage } from './../points/points';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BaseUI } from '../../common/baseui';

/**
 * Generated class for the YuePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-yue',
  templateUrl: 'yue.html',
})
export class YuePage extends BaseUI{
  public userInfo:string[] = new Array();
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage,
    private toastCtrl: ToastController
  ) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad YuePage');
    this.getUserInfo();
  }

  public getUserInfo(){
    this.storage.get('userInfo').then(
      (val)=>{
        console.log(val);
        this.userInfo = val;
      },
      (error)=>{
        super.showToast(this.toastCtrl,'请先登录');
      }
    );
  }

  public gotoPoints(type){
    this.navCtrl.push(PointsPage,{type:type});
  }

  public gotoWithdraw(){
    this.navCtrl.push(WithdrawPage);
  }

  public gotoRecharge(){
    this.navCtrl.push(RechargePage);
  }
}
