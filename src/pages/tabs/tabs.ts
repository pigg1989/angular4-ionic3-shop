import { GoodsListPage } from './../goods-list/goods-list';
import { MemeberPage } from './../memeber/memeber';
import { CartPage } from './../cart/cart';
import { CategoryPage } from './../category/category';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';



@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  public tabHome = HomePage;
  public tabCategory = CategoryPage;
  public tabCart = CartPage;
  public tabMember = MemeberPage;
  public tabGoodsList = GoodsListPage;

  constructor() {
/* 
 <ion-tab [root]="tabGoodsList" icon-on="home-logo-on" class="home-logo-on" icon="bar_logo" tabTitle="" tabIcon="">
  </ion-tab>
*/
  }
}
