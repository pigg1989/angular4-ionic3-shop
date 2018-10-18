import { SliderPage } from './../slider/slider';
import { Storage } from '@ionic/storage';
import { SearchPage } from './../search/search';
import { GoodsDetailsPage } from './../goods-details/goods-details';
import { GoodsListPage } from './../goods-list/goods-list';
import { LoadingController, NavParams } from 'ionic-angular';
import { ArticleListPage } from './../article-list/article-list';
import { ArticleDeatilPage } from './../article-deatil/article-deatil';
import { RestProvider } from './../../providers/rest/rest';
import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { BaseUI } from '../../common/baseui';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends BaseUI{
  public indexAds: string[] = new Array();
  public errorMessage: any[];
  public articles:Array<any> = new Array();
  public goodsIndexHotRight1: string;
  public goodsIndexHotRight2: string;
  public goodsIndexHotLeft: string;
  public goodsIndex: string[] = new Array();
  public keyWords: string = '';
  public isShowSlider: boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private rest: RestProvider,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private storage: Storage
  ) {
    super();
    console.log('construct');

      // 判断引导页
      this.storage.get('isShowSlider').then(
        (val)=>{
          if(!val){
  
            this.modalCtrl.create(SliderPage).present();
          }
        }
      )
  }

  ionViewDidLoad(){
    
    this.getArticles();
    this.getGoodsIndexHot();
    this.getGoodsIndex();
   console.log('viewdidload');
  }
  
  ionViewWillEnter(){
    this.getIndexAds();
  }
/**
 * 获取首页广告并缓存
 * 
 * @private
 * @memberof HomePage
 */
private getIndexAds(){
   this.rest.getIndexAds().subscribe(
     (res)=>{
       this.indexAds = res;
     },
     (error)=>{
      console.log(error);
     }
   );
  console.log(this.indexAds);
  }

  private getArticles(){
    this.rest.getArticles().subscribe(
      (res)=>{
        let j = 0;        
        for(let i = 0; i< res.length; i = i+2){
          this.articles[j] = new Array();
          this.articles[j].push(res[i]);
          if(res[i+1]){
            this.articles[j].push(res[i + 1]);
          }
          
          j++;
        }
      },
      (error)=>{
        console.log(error);
      }
    );
    console.log(this.articles);
  }
 
  showArticle(aritcleId){
    let modal = this.modalCtrl.create(ArticleDeatilPage, { id: aritcleId});
    modal.present();
  }

  public gotoArticleList(){
    this.navCtrl.push(ArticleListPage);
  }

  public getGoodsIndexHot(){
    this.rest.getIndexHotGoods().subscribe(
     (res)=>{
        this.goodsIndexHotRight1 = res[0];
        this.goodsIndexHotRight2 = res[1];
        this.goodsIndexHotLeft = res[2];
        console.log(this.goodsIndexHotLeft['original_img']);
      },
      (error)=>{
        console.log(error);
      } 
     
    );
   console.log(this.goodsIndexHotLeft);
  }

  public getGoodsIndex(){
    let loading = super.showLoading(this.loadingCtrl,'加载中....');
    loading.present();
    this.rest.getIndexGoods().subscribe(
      (res)=>{
        this.goodsIndex = res;
        console.log(this.goodsIndex);
        if(loading){
          loading.dismiss();
        }
      },
      (error)=>{
        // loading.dismiss();
        console.log(error);
      }
    );
  }

  public gotoGoodsList(cateId){
    console.log(cateId);
    this.navCtrl.push(GoodsListPage,{cateId: cateId});
  }

  public gotoGoodsDetails(goodsId){
    this.navCtrl.push(GoodsDetailsPage, {goodsId: goodsId});
  }

  public gotoGoodsListByKeyWords(keyWords){
    console.log(keyWords);
    this.navCtrl.push(GoodsListPage,{keyWords: keyWords});
  }

  public gotoSearch(){
    this.navCtrl.push(SearchPage);
  }

  public gotoUgouwu(iconNum){
    this.navCtrl.push(GoodsListPage, { goodsListType: 'icon', goodsListIconNum:iconNum});
  }
}
