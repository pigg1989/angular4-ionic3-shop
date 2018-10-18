import { LoadingController, ViewController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { RestProvider } from './../../providers/rest/rest';

import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { BaseUI } from '../../common/baseui';

/**
 * Generated class for the WithdrawPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-withdraw',
  templateUrl: 'withdraw.html',
})
export class WithdrawPage extends BaseUI{
  public bankName: string;
  public bankCard: string;
  public money: string;
  public realname: string;
  public verify: string = '';
  public maxMoney: string = '';
  public hasGetVerify: boolean = false;
  public verifyBtnMsg: string = '获取验证码';
  public mobile: string;
  public addType: string = 'yue';
  public userId: string = '';
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: Storage,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private rest: RestProvider,
    private viewCtrl: ViewController
  ) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WithdrawPage');
   
   
  }

  ionViewWillEnter(){
    this.addType = this.navParams.get('addType')?this.navParams.get('addType'):'yue';
    this.storage.get('userInfo').then(
      (val)=>{
        console.log(val);
        this.maxMoney = val['user_money'];
        this.mobile = val['mobile'];
        this.userId = val['user_id'];
        if(this.addType != 'yue'){
          this.maxMoney = val['commision_money'];
        }
        if(!(this.mobile&&this.userId)){
          super.showToast(this.toastCtrl,'您还未绑定手机号码，无法提现');
        }
      }
    );
   
  }
  public appWithdraw(){
   
    if(!this.bankCard){
      super.showToast(this.toastCtrl,'请填写银行卡号');
      return null;
    }
    if(!this.realname){
      super.showToast(this.toastCtrl,'请填写开户名');
      return null;
    }
    if(!this.bankName){
      super.showToast(this.toastCtrl,'请填写银行名称');
      return null;
    }
    if(!this.money){
      super.showToast(this.toastCtrl,'请填写提现金额');
      return null;
    }
    if(Number(this.money) > Number(this.maxMoney)){
      super.showToast(this.toastCtrl,'提现金额超出最大金额');
      return null;
    }
    if(!this.verify){
      super.showToast(this.toastCtrl,'请填写验证码');
      return null;
    }
    if(!this.mobile){
      super.showToast(this.toastCtrl,'您还未绑定手机号码，无法提现');
      return null;
    }
   /*  let loading = super.showLoading(this.loadingCtrl,'提交中......');
    loading.present(); */
    this.rest.addWithdraw(this.addType,this.mobile,this.userId,this.bankCard,this.realname,this.bankName,this.money,this.verify).subscribe(
      (res)=>{
        // loading.dismiss();
        if(res['status'] > 0){
          super.showToast(this.toastCtrl,'提交成功');
          this.viewCtrl.dismiss();
        }else{
          super.showToast(this.toastCtrl,res['msg']);
        }
      },
      (error)=>{
       console.error(error);
        
      }
    )
  }

  public getMobileVerify(){ 
    this.hasGetVerify = !this.hasGetVerify;
    let num = 60;
    if(this.hasGetVerify){
      this.verifyBtnMsg = num+"后重新获取";
      this.rest.getVerify(this.mobile).subscribe(
        (res)=>{
          if(res['status'] == 1){
            super.showToast(this.toastCtrl,res['msg']);
          }else{
            super.showToast(this.toastCtrl,res['msg']);
          }
        }
      )
    }else{
      this.verifyBtnMsg = '获取验证码';
    }
    let timer = setInterval(
      ()=>{
        this.verifyBtnMsg = num-- +"后重新获取";
        if(num<=0){
          clearInterval(timer);
          this.verifyBtnMsg = '获取验证码';
          this.hasGetVerify = false;
        }
      },1000
    );
  }
}
