import { SearchPage } from './../search/search';
import { GoodsListPage } from './../goods-list/goods-list';
import { RestProvider } from './../../providers/rest/rest';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { BaseUI } from '../../common/baseui';

/**
 * Generated class for the CategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage extends BaseUI{
public categories: string[] = new Array();
public cateAds: string[] = new Array();
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private rest: RestProvider,
    private loadingCtrl: LoadingController
    
  ) {
    super();
    this.getCateAds();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryPage');
    this.getCategory();
  }

  public getCategory(){
    let loading = super.showLoading(this.loadingCtrl,'加载中');
    loading.present();
    this.rest.getCategory(this.categories.length>0?this.categories.length:0).subscribe(
      (res)=>{
        // loading.dismiss();
        
        for(let i in res){
          this.categories.push(res[i]);
        }
        console.log(this.categories);
      },
      (error)=>{
       
        console.log(error);
      }
    );
  }

  public gotoGoodsList(cateId){
    console.log(cateId);
    this.navCtrl.push(GoodsListPage,{cateId: cateId});
  }

  public gotoSearch(){
    this.navCtrl.push(SearchPage);
  }

  private getCateAds(){
    this.rest.getCateAds().subscribe(
      (res)=>{
        this.cateAds = res;
        console.log(this.cateAds);
      }
    )
  }
}
