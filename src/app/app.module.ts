import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { QRCodeModule } from 'angular2-qrcode';
import { NgxQRCodeModule } from 'ngx-qrcode2';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';

import { IonicStorageModule } from '@ionic/storage';
import { OneSignal } from '@ionic-native/onesignal';
import { PayPal } from '@ionic-native/paypal';
import { SMS } from '@ionic-native/sms';



@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    QRCodeModule,
    NgxQRCodeModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    OneSignal,
    PayPal,
    SMS,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
