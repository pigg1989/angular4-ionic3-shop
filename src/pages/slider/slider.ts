import { TabsPage } from './../tabs/tabs';
import { Storage } from '@ionic/storage';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

/**
 * Generated class for the SliderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-slider',
  templateUrl: 'slider.html',
})
export class SliderPage {
  public slides = [
    {
      title: "任性剁手买买买",
      description: "返利在手生活无忧",
      image: "assets/imgs/ica-slidebox-img-1.png",
    },
    {
      title: "优质好货淘淘淘",
      description: "返利在手美丽拥有",
      image: "assets/imgs/ica-slidebox-img-2.png",
    }
  ];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private storage: Storage
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SliderPage');
  }

  public gotoHome(){
    this.storage.set('isShowSlider',true);
    this.modalCtrl.create(TabsPage).present();
  }
}
