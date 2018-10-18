import { RestProvider } from './../../providers/rest/rest';
import { SetPage } from './../set/set';
import { LoadingController } from 'ionic-angular';
import { ArticleListPage } from './../article-list/article-list';
import { AddressPage } from './../address/address';
import { MyteamPage } from './../myteam/myteam';
import { CollectPage } from './../collect/collect';
import { DistributePage } from './../distribute/distribute';
import { CommisionPage } from './../commision/commision';
import { OrderListPage } from './../order-list/order-list';
import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { YuePage } from '../yue/yue';
import { BaseUI } from '../../common/baseui';

/**
 * Generated class for the MemeberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-memeber',
  templateUrl: 'memeber.html',
})
export class MemeberPage extends BaseUI{
  public isLogin: boolean = false;
  public userInfo: string[] = new Array();
  public userId: string = '';
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private rest: RestProvider
  ) {
    super();
    
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MemeberPage');
  }

  ionViewWillEnter(){
    console.log(this.userInfo);
    this.storage.get('userId').then(
      (val)=>{
      console.log('userid==='+val);
        if(val){
          console.log(55555555);
          console.log(this.userInfo);
          this.isLogin = val ? true : false;
          this.userId = val;
          if (this.userId) {
            //获取最新用户信息
            this.rest.getUserInfo(this.userId).subscribe(
              (res)=>{
                if(res){
                  this.userInfo = res;
                  this.storage.set('userInfo',this.userInfo);
                }
              }
            )
            //自动处理相应程序
            this.rest.autoMember(this.userId).subscribe();
          }
        }else{
          this.isLogin = false;
          this.storage.clear();
        }
        
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  public gotoLogin(){
    this.navCtrl.push(LoginPage);
  }

  public gotoOrderList(type){
    if(this.isLogin){
      this.navCtrl.push(OrderListPage, { type: type });
    }else{
      super.showToast(this.toastCtrl,'请先登录');
    }
    
  }

  public gotoYue(){
    if(this.isLogin){
      this.navCtrl.push(YuePage);
    }else{
      super.showToast(this.toastCtrl,'请先登录');
    }
  }

  public gotoCommision(){
    if(this.isLogin){
      this.navCtrl.push(CommisionPage);
    }else{
      super.showToast(this.toastCtrl, '请先登录');
    }
    
  }

  public gotoDistribut(){
    if(this.isLogin){
      this.navCtrl.push(DistributePage);
    }else{
      super.showToast(this.toastCtrl, '请先登录');
    }
   
  }

  public gotoCollect(type){
    if(this.isLogin){
      this.navCtrl.push(CollectPage, { type: type });
    }else{
      super.showToast(this.toastCtrl, '请先登录');
    }
    
  }

  public gotoMyteam(){
    if(this.isLogin){
      this.navCtrl.push(MyteamPage);
    }else{
      super.showToast(this.toastCtrl, '请先登录');
    }
    
  }

  public gotoAddress(){
    if(this.isLogin){
      this.navCtrl.push(AddressPage);
    }else{
      super.showToast(this.toastCtrl, '请先登录');
    }
    
  }

  public gotoSet(){
    if(this.isLogin){
      this.navCtrl.push(SetPage);
    }else{
      super.showToast(this.toastCtrl,'请先登录');
    }
  }
  public gotoArticle(){
    this.navCtrl.push(ArticleListPage);
  }
}
