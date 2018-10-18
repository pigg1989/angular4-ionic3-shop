import { GoodsSpec } from './../../common/class/goodsSpec';
import { Storage } from '@ionic/storage';
import { RestProvider } from './../../providers/rest/rest';
import { ChoosePage } from './../choose/choose';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { BaseUI } from '../../common/baseui';

/**
 * Generated class for the GoodsDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-goods-details',
  templateUrl: 'goods-details.html',
})
export class GoodsDetailsPage extends BaseUI{
  public notifications: string = '';
  public goodsId: number = 0;
  public goods: string = 'basic';
  public starStyle: string ="star-outline";
  public content: string[] = new Array();
  public goodsImgs: string[] = new Array();
  public goodsDetails: string[] = new Array();
  public chooseStr: string = '';
  public userId: string = '';
  public choosenSpec: GoodsSpec;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private rest: RestProvider,
    private loadingCtrl: LoadingController,
    private storage: Storage
  ) {
    super();
    this.goodsId = this.navParams.get('goodsId');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GoodsDetailsPage');
    console.log(this.goodsId);
    this.getGoodsContent();
    this.getGoodsImgs();
    this.isGoodsCollect();
  }

  private isGoodsCollect(){
    this.storage.get('userId').then(
      (val)=>{
        console.log(val);
        if(val){
          this.userId = val;
          this.rest.readCollect(val,this.goodsId).subscribe(
            (res)=>{
              if(res['status']){
                this.starStyle = 'star';
              }else{
                this.starStyle = 'star-outline';
              }
            }
          );
        }
      }
    );
  }
  public gotoChoose(choosenSence="choosen"){
    
    let modal = this.modalCtrl.create(ChoosePage,{goodsId: this.goodsId,goodsName:this.content['goods_name'], img: this.content['original_img'], price: this.content['shop_price'], stock: this.content['store_count'], choosenSpec: this.choosenSpec, choosenSence: choosenSence});
    modal.onDidDismiss(
      (data)=>{
        if(data){
          this.chooseStr = data.str ? data.str : '';
          this.choosenSpec = data.choosenSpec;
        };
        
      }
    );
    modal.present();
  }

  public changeCollect(){
    if(this.starStyle === 'star'){
      this.rest.delCollect(this.userId,this.goodsId).subscribe(
        (res)=>{
          console.log(res);
        }
      );
      this.starStyle = 'star-outline';
    }else{
      this.rest.createCollect(this.userId,this.goodsId).subscribe(
        (res)=>{
          console.log(res);
        }
      );
      this.starStyle = 'star';
    }
  }

  private getGoodsContent(){
    this.rest.getGoodsContentById(this.goodsId).subscribe(
      (res)=>{
        this.content = res;
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  private getGoodsImgs(){
    let loading = super.showLoading(this.loadingCtrl,'加载中.....');
    this.rest.getGoodsImgsById(this.goodsId).subscribe(
      (res)=>{
        this.goodsImgs = res;
        loading.dismiss();
      },
      (error)=>{
        console.log(error);
        loading.dismiss();
      }
    );
  }

  private getGoodsDetails(){
    let loading = super.showLoading(this.loadingCtrl, '加载中.....');
    this.rest.getGoodsDetailsById(this.goodsId).subscribe(
      (res)=>{
        this.goodsDetails = res;
        loading.dismiss();
        console.log(this.goodsDetails);
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  public segmentChanged(segment){
    console.log(segment.value);
    switch(segment.value){
      case 'details':
        this.getGoodsDetails();
      break;
      case 'comment':
        this.getGoodsComments();
      break;
      default:
        this.getGoodsContent();
      break;
    }
  }

  private getGoodsComments(){
   
  }
}
