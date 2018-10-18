import { ToastController } from 'ionic-angular';
import { RestProvider } from './../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BaseUI } from '../../common/baseui';

/**
 * Generated class for the MyteamPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myteam',
  templateUrl: 'myteam.html',
})
export class MyteamPage extends BaseUI{
  public lowers: string[] = new Array();
  public higher: string[] = new Array();
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage,
    private rest: RestProvider,
    private toastCtrl: ToastController
  ) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyteamPage');
    this.getLower();
    this.getHigher();
  }

  public getLower(){
    this.storage.get('userInfo').then(
      (val)=>{
        if(val['user_id']){
          this.rest.getLower(val['user_id'], this.lowers.length > 0 ? this.lowers.length : 0).subscribe(
            (res) => {
              for (let i = 0; i < res.length; i++) {
                this.lowers.push(res[i]);
              }
            },
            (error) => {
              console.log(error);
            }
          );
        }else{
          super.showToast(this.toastCtrl,'请先登录');
        }
       
      }
    );
  }

  public getHigher(){
    this.storage.get('userInfo').then(
      (val) => {
        this.rest.getHigher(val['user_id'], this.higher.length > 0 ? this.higher.length : 0).subscribe(
          (res) => {
            for (let i = 0; i < res.length; i++) {
              this.higher.push(res[i]);
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }
    );
  }
}
