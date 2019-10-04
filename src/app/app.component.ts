import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { NotificationService } from '../services/notification/notification.service';
import { SharedService } from '../services/shared/shared.service';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private ns: NotificationService,
    private shared: SharedService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.notificationSetup();
    });
  }

  private notificationSetup() {
    this.ns.topicSubscription('stuff');
    this.ns.getToken();
    this.ns.onNotifications().subscribe(
      (msg) => {
        if (this.platform.is('ios')) {
          this.shared.presentToast(msg.aps.alert);
        } else {
          this.shared.presentToast(msg.body);
        }
      });
  }
}
