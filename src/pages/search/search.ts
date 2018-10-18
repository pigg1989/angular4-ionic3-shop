import { GoodsListPage } from './../goods-list/goods-list';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  public keywords: string = '';
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  public search(keywords){
    this.navCtrl.push(GoodsListPage,{keywords:keywords});
  }

  public onSearchKeyUp(event){
    if("Enter"==event.key){
      this.navCtrl.push(GoodsListPage,{keywords:this.keywords});
    }
  }
}
