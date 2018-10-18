import { RestProvider } from './../../providers/rest/rest';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the ArticleDeatilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-article-deatil',
  templateUrl: 'article-deatil.html',
})
export class ArticleDeatilPage {
  public id: number;
  public content: any;
  public title: string; 
  public thumb: string; 
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private rest: RestProvider,
    private viewCtrl: ViewController,
    private sanitizer: DomSanitizer
  ) {
    this.id = this.navParams.get('id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArticleDeatilPage');
    console.log(this.id);    
  }

  ionViewWillEnter(){
    this.rest.getArticleById(this.id).subscribe(
      (res)=>{
        console.log(res);
        this.content = this.assembleHTML(res['content']);
        this.title = res['title'];
        this.thumb = res['thumb'];
      },
      (error)=>{
        console.log(error);
      }
    );
    console.log(this.content);
  }
  
  public dismiss(){
    this.viewCtrl.dismiss();
  }

  private assembleHTML(strHTML:any):any{   
    return this.sanitizer.bypassSecurityTrustHtml(strHTML);
  }
}
