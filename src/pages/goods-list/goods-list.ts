import { GoodsDetailsPage } from './../goods-details/goods-details';
import { RestProvider } from './../../providers/rest/rest';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the GoodsListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-goods-list',
  templateUrl: 'goods-list.html',
})
export class GoodsListPage {
public goodsList: string[] = new Array();
public goodsCateId: number = 0;
public goodsCateName: string = '商品列表';
public goodsKeyWords: string = '';
public goodsListType: string = '';
public goodsListIconNum: number = 1;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public rest: RestProvider
  ) {
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GoodsListPage');
   
   
  }

  ionViewWillEnter(){
    this.goodsListType = this.navParams.get('goodsListType')?this.navParams.get('goodsListType'):false;
    this.goodsListIconNum = this.navParams.get('goodsListIconNum')?this.navParams.get('goodsListIconNum'):1;
    if(this.goodsListType){
      this.rest.getGoodsListByIconNum(this.goodsList.length,this.goodsListIconNum).subscribe(
        (res)=>{
          for(let i in res){
            if(res[i]){
              this.goodsList.push(res[i]);
            }
          }        
        },
        (error)=>{
          console.log(error);
        }
      );
    }else{
      this.goodsCateId = this.navParams.get('cateId');
      this.goodsKeyWords = this.navParams.get('keywords') ? this.navParams.get('keywords') : '';
      console.log(this.goodsKeyWords);
      if (this.goodsCateId) {
        this.getGoodsListByCateId(this.goodsCateId);
      } else if (this.goodsKeyWords) {
        this.getGoodsListByKeyWords(this.goodsKeyWords);
      } else {
        this.getGoodsListAll();
      }
    }
   
  }
  private getGoodsListByKeyWords(keyWords){
   
    this.rest.getGoodsListByKeyWords(keyWords).subscribe(
      (res) => {
        for (let i in res) {
          if (res[i]) {
            this.goodsList.push(res[i]);
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  private getGoodsListByCateId(cateId,goodsIndex = 0){
   
    this.rest.getGoodsListByCateId(cateId,goodsIndex).subscribe(
      (res)=>{
        for(let i in res){
          if(res[i]){
            this.goodsList.push(res[i]);
          }
        }        
      },
      (error)=>{
        console.log(error);
      }
    );
  }
  public gotoGoodsDetails(goodsId){
    this.navCtrl.push(GoodsDetailsPage,{goodsId: goodsId});
  }

  public doInfinite(infiniteScroll) {
    let goodsIndex = this.goodsList.length - 1;
    if(this.goodsCateId){
      this.getGoodsListByCateId(this.goodsCateId, goodsIndex);
    }else{
      this.getGoodsListAll();
    }
    
    infiniteScroll.complete();
  }

  public getGoodsListAll(){
    this.rest.getGoodsList(this.goodsList.length>0?this.goodsList.length:0).subscribe(
      (res)=>{
        for(let i in res){
          this.goodsList.push(res[i]);
        }
        console.log(this.goodsList);
      }
    );
  }
}
