import { ToastController } from 'ionic-angular';
import { RestProvider } from './../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BaseUI } from '../../common/baseui';

/**
 * Generated class for the DistributePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-distribute',
  templateUrl: 'distribute.html',
})
export class DistributePage extends BaseUI{
  public distributeUrl: string = "http://ufanli168.battleax.cn/index.php?m=Apphelp&c=User&a=reg&first_leader=";
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
    console.log('ionViewDidLoad DistributePage');
   
  }

  ionViewWillEnter(){
    this.storage.get('userId').then(
      (val)=>{
        this.distributeUrl += val;
      }
    );
  }
}


