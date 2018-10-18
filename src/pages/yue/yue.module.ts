import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { YuePage } from './yue';

@NgModule({
  declarations: [
    YuePage,
  ],
  imports: [
    IonicPageModule.forChild(YuePage),
  ],
})
export class YuePageModule {}
