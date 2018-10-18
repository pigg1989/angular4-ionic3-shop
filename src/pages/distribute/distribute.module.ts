import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DistributePage } from './distribute';

@NgModule({
  declarations: [
    DistributePage,
  ],
  imports: [
    IonicPageModule.forChild(DistributePage),
  ],
})
export class DistributePageModule {}
