import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { SharedService } from '../services/shared/shared.service';
import { QueryService } from '../services/query/query.service';
import { NotificationService } from '../services/notification/notification.service';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { Firebase } from '@ionic-native/firebase/ngx';

const config = {
  apiKey: "AIzaSyBniJ3RXJWyfCwY0d91TOpTJ2os2mDmgcI",
  authDomain: "getitcheaper.firebaseapp.com",
  databaseURL: "https://getitcheaper.firebaseio.com",
  projectId: "getitcheaper",
  storageBucket: "",
  messagingSenderId: "205873441313",
  appId: "1:205873441313:web:b9a348653a77321e171160",
  measurementId: "G-LFKE327KHC"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SharedService,
    QueryService,
    NotificationService,
    Firebase,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
