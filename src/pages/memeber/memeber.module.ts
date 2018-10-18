import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MemeberPage } from './memeber';

@NgModule({
  declarations: [
    MemeberPage,
  ],
  imports: [
    IonicPageModule.forChild(MemeberPage),
  ],
})
export class MemeberPageModule {}
