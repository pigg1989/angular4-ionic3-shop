import { Storage } from '@ionic/storage';
import { ToastController, ViewController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { RestProvider } from './../../providers/rest/rest';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BaseUI } from '../../common/baseui';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage extends BaseUI{
  public userName: string = '';
  public password: string = '';
  public isMobileLogin: boolean = false;
  public mobile: string = '';
  public verify: string = '';
  public loginBtnMsg: string = '手机号快捷登陆';
  public mobileForm: FormGroup;
  public hasGetVerify: boolean = false;
  public verifyBtnMsg: string = '获取验证码';
  public loginType: string = 'normal';
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private rest: RestProvider,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private storage: Storage,
    private viewCtrl: ViewController,
    private fb: FormBuilder
  ) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    console.log()
  }

  public login(){
   
    if(this.isMobileLogin){
      
      console.log(this.mobileForm.valid);
      console.log(this.mobileForm.get('mobile').valid);
      if(!this.mobileForm.get('mobile').valid){
        super.showToast(this.toastCtrl,'请填写正确的手机号码');
        return null;
      }
      if(!this.mobileForm.get('verify').valid){
        super.showToast(this.toastCtrl,'请填写验证码');
        return null;
      }
      this.mobile = this.mobileForm.get('mobile').value;
      this.verify = this.mobileForm.get('verify').value;
      this.loginType = 'mobile';
      this.userName = this.mobile;
      this.password = this.verify;
      
    }
    let loading = super.showLoading(this.loadingCtrl,'登录中');
      this.rest.login(this.userName, this.password, this.loginType).subscribe(
        (res)=>{
          console.log(res);
          let toast = super.showToast(this.toastCtrl, res['msg']);
          if(res['status'] == 1){
         
          loading.dismiss();
          toast.present();
          if(res['status']){
            this.storage.set('userInfo',res['result']);
            this.storage.set('userId',res['result']['user_id']);
            this.viewCtrl.dismiss();
          }
          }else{
            loading.dismiss();
            toast.present();
            
          }
          
        },
        (error)=>{
          console.log(error);
        }
        
      );
  }

  public mobileLogin(){
    this.isMobileLogin = !this.isMobileLogin;
    if(this.isMobileLogin){
      this.loginBtnMsg = '用户名/密码登陆';
    }else{
      this.loginBtnMsg = '手机号快捷登陆';
    }
    this.mobileForm = this.fb.group({
      mobile:['',[Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\\d{8}$')]],
      verify:['',[Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    })
  }

  public getMobileVerify(){    
    if(!this.mobileForm.get('mobile').valid){
      super.showToast(this.toastCtrl,'请填写正确的手机号码');
      return null;
    }
    this.mobile = this.mobileForm.get('mobile').value;
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
        if(num<=50){
          clearInterval(timer);
          this.verifyBtnMsg = '获取验证码';
          this.hasGetVerify = false;
        }
      },1000
    );
  }
}
