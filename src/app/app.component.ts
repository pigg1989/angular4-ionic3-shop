import { RestProvider } from './../providers/rest/rest';
import { NativeProvider } from './../providers/native/native';
import { AppVersion } from '@ionic-native/app-version';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    private native: NativeProvider,
    private appVersion: AppVersion,
    private rest: RestProvider
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.appVersion.getVersionNumber().then(
        (version:string)=>{
          this.rest.getAppVersion(version).subscribe(
            (res)=>{
              console.log(res);
              if(res['needUpdate'] == true){
                this.native.detectionUpgrade(res['downloadUrl'],true);
              }
            }
          );
        }
      );
    });
  }
}
