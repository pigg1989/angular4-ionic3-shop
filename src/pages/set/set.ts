import { AppVersion } from '@ionic-native/app-version';

import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the SetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-set',
  templateUrl: 'set.html',
})
export class SetPage {
  public nickname: string;
  public level: string;
  public levelName: string;
  public mobile: string;  
  public version: string;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage,
    private viewCtrl: ViewController,
    private appVersion: AppVersion
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SetPage');
  }

  ionViewWillEnter(){
    this.storage.get('userInfo').then(
      (val)=>{
        this.nickname = val['nickname'];
        this.mobile = val['mobile'];
        this.levelName = val['level_name'];
      }
    );
    this.appVersion.getVersionNumber().then(
      (val)=>{
        this.version = val;
      }
    )
  }

  public logOut(){
    this.storage.clear().then(
      (s)=>{
        console.log(s);
        this.viewCtrl.dismiss();
      },
      (f)=>{
        console.log(f);
      }
    );
  }
}
