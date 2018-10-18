import { WithdrawPage } from './../withdraw/withdraw';
import { Storage } from '@ionic/storage';

import { RestProvider } from './../../providers/rest/rest';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CommisionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-commision',
  templateUrl: 'commision.html',
})
export class CommisionPage {
  public commisionMoney: string;
  public nickname: string = '';
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private rest: RestProvider,
    private storage: Storage
   
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommisionPage');
   
  }

  ionViewWillEnter(){
    this.storage.get('userInfo').then(
      (val)=>{
        this.nickname = val['nickname'];
        this.commisionMoney = val['commision_money'];
      }
    )
  }

  public gotoWithdraw(scene){
    this.navCtrl.push(WithdrawPage,{addType:scene});
  }
  

}
