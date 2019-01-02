import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ProdDetailsPage } from '../pages/prod-details/prod-details';
import { OrderPage } from '../pages/order/order';
import { ConfirmOrderPage } from '../pages/confirm-order/confirm-order';
import { OrderListPage } from '../pages/order-list/order-list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { PromiseProvider } from '../providers/promise/promise';
import { UtilsProvider } from '../providers/utils/utils';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ProdDetailsPage,
    OrderPage,
    ConfirmOrderPage,
    OrderListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ProdDetailsPage,
    OrderPage,
    ConfirmOrderPage,
    OrderListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PromiseProvider,
    UtilsProvider
  ]
})
export class AppModule {}
