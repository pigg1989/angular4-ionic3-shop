import { SliderPage } from './../pages/slider/slider';
import { AppVersion } from "@ionic-native/app-version";
import { FileOpener } from "@ionic-native/file-opener";
import { FileTransfer, FileTransferObject } from "@ionic-native/file-transfer";
import { File } from "@ionic-native/file";
import { AddAddressPage } from './../pages/add-address/add-address';
import { SearchPage } from './../pages/search/search';
import { RechargePage } from './../pages/recharge/recharge';
import { WithdrawPage } from './../pages/withdraw/withdraw';
import { SetPage } from './../pages/set/set';
import { Device } from '@ionic-native/device';
import { OrderSdetailPage } from './../pages/order-sdetail/order-sdetail';
import { QRCodeModule } from 'angularx-qrcode';
import { OrderSuccessPage } from './../pages/order-success/order-success';
import { OrderDetailPage } from './../pages/order-detail/order-detail';
import { AddressPage } from './../pages/address/address';
import { MyteamPage } from './../pages/myteam/myteam';
import { CollectPage } from './../pages/collect/collect';
import { DistributePage } from './../pages/distribute/distribute';
import { CommisionPage } from './../pages/commision/commision';
import { PointsPage } from './../pages/points/points';
import { YuePage } from './../pages/yue/yue';
import { OrderListPage } from './../pages/order-list/order-list';
import { LoginPage } from './../pages/login/login';
import { ChoosePage } from "./../pages/choose/choose";
import { GoodsDetailsPage } from './../pages/goods-details/goods-details';
import { GoodsListPage } from './../pages/goods-list/goods-list';
import { ArticleListPage } from './../pages/article-list/article-list';
import { ArticleDeatilPage } from './../pages/article-deatil/article-deatil';
import { MemeberPage } from './../pages/memeber/memeber';
import { CartPage } from './../pages/cart/cart';
import { CategoryPage } from './../pages/category/category';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { MultiPickerModule } from "ion-multi-picker";
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestProvider } from '../providers/rest/rest';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from "@ionic/storage";
import { ReactiveFormsModule } from '@angular/forms';
import { NativeProvider } from '../providers/native/native';

@NgModule({
  declarations: [
    MyApp,
    CategoryPage,
    CartPage,
    MemeberPage,
    HomePage,
    ArticleDeatilPage,
    ArticleListPage,
    GoodsListPage,
    GoodsDetailsPage,
    ChoosePage,
    LoginPage, 
    OrderListPage,
    YuePage,
    PointsPage,
    CommisionPage,
    DistributePage,
    CollectPage,
    MyteamPage,
    AddressPage,
    OrderDetailPage,
    OrderSuccessPage,
    OrderSdetailPage,
    CommisionPage,
    SetPage,
    WithdrawPage,
    RechargePage,
    SearchPage,
    AddAddressPage,
    SliderPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      backButtonText: '返回'
    }),
    HttpClientModule,
    IonicStorageModule.forRoot(),
    QRCodeModule,
    ReactiveFormsModule,
    MultiPickerModule
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CategoryPage,
    CartPage,
    MemeberPage,
    HomePage,
    ArticleDeatilPage,
    ArticleListPage,
    GoodsListPage,
    GoodsDetailsPage,
    ChoosePage,
    LoginPage,
    OrderListPage,
    YuePage,
    PointsPage,
    CommisionPage,
    DistributePage,
    CollectPage,
    MyteamPage,
    AddressPage,
    OrderDetailPage,
    OrderSuccessPage,
    OrderSdetailPage,
    CommisionPage,
    SetPage,
    WithdrawPage,
    RechargePage,
    SearchPage,
    AddAddressPage,
    SliderPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    Device,
    AppVersion,
    FileOpener,
    FileTransfer,FileTransferObject,File,
    NativeProvider
  
   
  ]
})
export class AppModule {}
