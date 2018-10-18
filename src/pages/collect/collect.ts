import { GoodsDetailsPage } from './../goods-details/goods-details';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { RestProvider } from './../../providers/rest/rest';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BaseUI } from '../../common/baseui';

/**
 * Generated class for the CollectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-collect',
  templateUrl: 'collect.html',
})
export class CollectPage extends BaseUI{
  public type: string;
  public goodsList: string[] = new Array();
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private rest: RestProvider,
    private storage: Storage,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
    super();
    this.type = this.navParams.get('type');
    if(this.type =='collect'){
      this.type = '我的收藏';
    }else{
      this.type = '我的历史';
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CollectPage');
    this.getCollect(this.type);
  }

  public getCollect(type){
    let loading = super.showLoading(this.loadingCtrl,'加载中....');
    this.storage.get('userInfo').then(
      (val)=>{
        if(val['user_id']){
          this.rest.getCollect(type,val['user_id']).subscribe(
            (res)=>{
              loading.dismiss();
              this.goodsList = res;
            },
            (error)=>{
              loading.dismiss();
              console.log(error);
            }
          )
        }
      },
      ()=>{
        super.showToast(this.toastCtrl,'请先登录');
      }
    );
  }

  public gotoGoodsDetails(goodsId) {
    this.navCtrl.push(GoodsDetailsPage, { goodsId: goodsId });
  }
}
