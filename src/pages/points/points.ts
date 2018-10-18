import { Storage } from '@ionic/storage';
import { RestProvider } from './../../providers/rest/rest';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PointsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-points',
  templateUrl: 'points.html',
})
export class PointsPage {
  public type: string;
  public points: string[] = new Array();
  public dongci: string = '';
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private rest: RestProvider,
    private storage: Storage
  ) {
    this.type = this.navParams.get('type');
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PointsPage');
    this.getPoints(this.type);
  }

  public getPoints(type){
    this.storage.get('userInfo').then(
      (val)=>{
        this.rest.getPoints(type,val['user_id'],this.points.length).subscribe(
          (res)=>{
            this.points = res;
          },
          (error)=>{
            console.log(error);
          }
        )
      }
    );
  }

  public doInfinite($event){
    this.getPoints(this.type)
  }
}
