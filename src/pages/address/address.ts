import { AddAddressPage } from './../add-address/add-address';
import { RestProvider } from './../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { BaseUI } from '../../common/baseui';

/**
 * Generated class for the AddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-address',
  templateUrl: 'address.html',
})
export class AddressPage extends BaseUI{
public address: string[] = new Array();
public isOrder: boolean = false;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage,
    private rest: RestProvider,
    private toastCtrl: ToastController,
    private viewCtrl: ViewController
  ) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddressPage');
    
  }

  ionViewWillEnter(){
    this.getAddress();
    this.isOrder = this.navParams.get('isOrder')?true:false;
  }
  public getAddress(){
    this.storage.get('userInfo').then(
      (val)=>{
        if(val['user_id']){
          this.rest.getAddress(val['user_id'],this.address.length>0?this.address.length:1).subscribe(
            (res)=>{
              this.address = new Array();
              for(let i in res){
                this.address.push(res[i]);
              }
              console.log(this.address);
            }
          );
        }else{
          super.showToast(this.toastCtrl,'请先登录');
          this.viewCtrl.dismiss();
        }
      }
    );
  }

  public gotoAddAddress(){
    this.navCtrl.push(AddAddressPage);
  }

  public chooseAddress(addressId){
    if(this.isOrder){
      this.viewCtrl.dismiss({ addressId: addressId });
    }
    
  }
}
