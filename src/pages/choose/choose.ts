import { Device } from '@ionic-native/device';
import { LoginPage } from './../login/login';
import { Storage } from '@ionic/storage';
import { OrderDetailPage } from './../order-detail/order-detail';
import { GoodsSpec } from './../../common/class/goodsSpec';
import { RestProvider } from './../../providers/rest/rest';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { BaseUI } from '../../common/baseui';
import { GoodsInfoOrder } from '../../common/class/goodsInfoOrder';

/**
 * Generated class for the ChoosePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-choose',
  templateUrl: 'choose.html',
  
})

export class ChoosePage extends BaseUI{
  public goodsId: number;
  public goodsPrice: number = 0.0;
  public goodsName: string = '';
  public goodsImg: string = '';
  public goodsStock: number = 0;
  public goodsSpec: string[] = new Array();
  public goodsNum: number = 1; 
  public choosenSpec: GoodsSpec[] = new Array();
  public choosenSence: string = 'choose';
  public goodsInfo: GoodsInfoOrder[] = new Array();
  public userId: string = '';
  public uuid: string = ''
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private rest: RestProvider,
    private loadingCtrl: LoadingController,
    private storage: Storage,
    private toastCtrl: ToastController,
    private device: Device
  ) {
    super();
    this.uuid = this.device.uuid;
    this.goodsId = this.navParams.get('goodsId');
    this.goodsPrice = this.navParams.get('price');
    this.goodsImg = this.navParams.get('img');
    this.goodsStock = this.navParams.get('stock');
    this.goodsName = this.navParams.get('goodsName');
    this.choosenSpec = this.navParams.get('choosenSpec')?this.navParams.get('choosenSpen'):new Array();
    this.choosenSence = this.navParams.get('choosenSence')?this.navParams.get('choosenSence'):'choosen';
   
    
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChoosePage');
    this.getGoodsSpec();
  }
  ionViewWillEnter(){
    this.storage.get('userId').then(
      (val)=>{
        this.userId = val;
      }
    );
  }
  public gotoDetails(){  
    let str = '';
    for (let i in this.choosenSpec) {
      for (let j in this.goodsSpec) {
        if (this.choosenSpec[i]['specId'] === this.goodsSpec[j]['id']) {
          str += this.goodsSpec[j]['name'] + "    ";
          for (let k in this.goodsSpec[j]['items']) {
            if (this.choosenSpec[i]['itemId'] === this.goodsSpec[j]['items'][k]['id']) {
              str += this.goodsSpec[j]['items'][k]['item'] + "        ";
            }
          }
        }
      }
    }
   
    let goodsChoosenSpec = '';
    for(let i in this.choosenSpec){
      goodsChoosenSpec += this.choosenSpec[i]['itemId'] + '_';
    }
    goodsChoosenSpec = goodsChoosenSpec.slice(0,-1);
 
  let data = { goodsChoosenSpec: goodsChoosenSpec, goodsId: this.goodsId, goodsName: this.goodsName, goodsImg: this.goodsImg, goodsNum: this.goodsNum, goodsPrice: this.goodsPrice, goodsSpecStr: str };
   this.goodsInfo.push(data);

    switch(this.choosenSence){
      case 'choosen':        
        this.viewCtrl.dismiss(data);
        break;
      case 'cart':
        console.log(this.goodsInfo);
        
        this.storage.get('userId').then(
          (val)=>{
            val = val?val:0;
            this.rest.createCart(this.goodsInfo,val,this.uuid).subscribe(
              (res)=>{
                if(res['status']){
                  super.showToast(this.toastCtrl,'加入成功');
                  this.viewCtrl.dismiss(data);
                }
              }
            )
          }
        );
        break;
      case 'buy': 
        if(!this.userId)      {
          super.showToast(this.toastCtrl,'请先登录');
          this.navCtrl.push(LoginPage);
        }else{
          this.viewCtrl.dismiss(data);
          this.navCtrl.push(OrderDetailPage, { goodsInfo: this.goodsInfo });
        }
        
        break;
    }
    
  }

  private getGoodsSpec(){
    let loading = super.showLoading(this.loadingCtrl,'加载中....');
    this.rest.getGoodsSpecById(this.goodsId).subscribe(
      (res)=>{
        this.goodsSpec = res;
        console.log(this.goodsSpec,this.goodsSpec.length);
        loading.dismiss();
      },
      (error)=>{
        console.log(error);
        loading.dismiss();
      }
    );
  }

  public goodsNumPlus(){
    this.goodsNum++;
  }
  public goodsNumMinus(){
    if (this.goodsNum > 1) {
      this.goodsNum--;
    }
  }

  public chooseSpec(specId:number,itemId:number){
    this.goodsSpec.map(
      (s)=>{
        if(s['items'].length > 1){
          s['items'].map(
            (item)=>{
              if(item.id === itemId){
                item.outline = false;
              }else if(s['id'] === specId){
                item.outline = true;
              }
            }
          )
        }
      }
    );
    console.log(specId,itemId);

    // 规格选择数据处理
    let hasChoosen = false;
    if(this.choosenSpec.length >= 1){
      this.choosenSpec.map(
        (value, index) => {         
          if (value.specId === specId) {
            hasChoosen = true;
            this.choosenSpec.splice(index, 1, { specId, itemId });
          }
        }
      );   
    }
    if(!hasChoosen){
      this.choosenSpec.push({specId, itemId});
    }
   
  
  }

  public dismissPage(){
    this.viewCtrl.dismiss();
  }
}


