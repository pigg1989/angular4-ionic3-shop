import { ArticleDeatilPage } from './../article-deatil/article-deatil';
import { LoadingController, ModalController } from 'ionic-angular';

import { RestProvider } from './../../providers/rest/rest';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BaseUI } from '../../common/baseui';

/**
 * Generated class for the ArticleListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-article-list',
  templateUrl: 'article-list.html',
})
export class ArticleListPage extends BaseUI{
public articles: string[] = new Array();
public items: any[];
private articleIndex: number = 0;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private rest: RestProvider,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController
  ) {
    super();
  
  }

  ionViewDidLoad() {
  let loader = super.showLoading(this.loadingCtrl,'加载中....');
  this.getArticles(this.articleIndex);
  loader.dismiss();
  }

  public gotoDetail(articleId){
    let modal = this.modalCtrl.create(ArticleDeatilPage,{id:articleId});
    modal.present();
  }

  public doInfinite(infiniteScroll) {
    let articleIndex = this.articles.length - 1;
    this.getArticles(articleIndex);
    infiniteScroll.complete();
  }

  private getArticles(index){
    this.rest.getArticles(index).subscribe(
      (res) => {
        console.log(res);
        for (let i in res) {
          if (res[i]) {
            this.articles.push(res[i]);
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
