import { Storage } from '@ionic/storage';
import { ToastController, ViewController } from 'ionic-angular';
import { RestProvider } from './../../providers/rest/rest';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BaseUI } from '../../common/baseui';

/**
 * Generated class for the AddAddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-address',
  templateUrl: 'add-address.html',
})
export class AddAddressPage extends BaseUI{
  public addressApi: string[] = new Array();
  public consignee: string;
  public mobile: string;
  public addressChoosen: Object;
  public address: string;
  public is_default: boolean = true;
  public userId: string;
  public isOrder: boolean = false;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private rest: RestProvider,
    private toastCtrl: ToastController,
    private storage: Storage,
    private viewCtrl: ViewController

  ) {
    super();
    this.rest.getAddressApi().subscribe(
      (res)=>{
        this.addressApi = res;
        console.log(this.addressApi);
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddAddressPage');
   
  }

  ionViewWillEnter(){
    this.isOrder = this.navParams.get('isOrder')?this.navParams.get('isOrder'):false;
    this.storage.get('userId').then(
      (val)=>{
        this.userId = val;
        if(!this.userId){
          super.showToast(this.toastCtrl,'您还未登陆，不能操作');
        }
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  public addAddress(){
  
    if(!this.consignee){
      super.showToast(this.toastCtrl,'请填写收货人');
      return null;
    }
    if(!this.mobile){
      super.showToast(this.toastCtrl,'请填写手机号码');
      return null;
    }
    if(!this.addressChoosen){
      super.showToast(this.toastCtrl,'请选择所在地区');
      return null;
    }
    if(!this.address){
      super.showToast(this.toastCtrl,'请填写详细地址');
      return null;
    }
    
    this.rest.createAddress(this.userId,this.consignee,this.mobile,this.addressChoosen,this.address,this.is_default).subscribe(
      (res)=>{
        if(res['status']==1){
          super.showToast(this.toastCtrl,'添加成功');
          this.viewCtrl.dismiss();
        }
      }
    );
  }
}
