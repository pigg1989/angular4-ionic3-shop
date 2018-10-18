import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArticleDeatilPage } from './article-deatil';

@NgModule({
  declarations: [
    ArticleDeatilPage,
  ],
  imports: [
    IonicPageModule.forChild(ArticleDeatilPage),
  ],
})
export class ArticleDeatilPageModule {}
