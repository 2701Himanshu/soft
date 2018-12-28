import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProdDetailsPage } from './prod-details';

@NgModule({
  declarations: [
    ProdDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ProdDetailsPage),
  ],
})
export class ProdDetailsPageModule {}
