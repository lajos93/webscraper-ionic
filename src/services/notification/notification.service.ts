import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase/ngx';
import { Platform } from '@ionic/angular';
import { AngularFirestore } from 'angularfire2/firestore';

import { HttpClient } from '@angular/common/http';

import { SharedService } from '../shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private firebase: Firebase,
    private afs: AngularFirestore,
    private platform: Platform,
    private http : HttpClient,
    public shared: SharedService

  ) { }

  public topicSubscription(topic) {
    this.firebase.subscribe(topic).then((res:any) => {
      console.log('Subscribed to topic: ' + topic, res);
    });
  }

  public sendUserData(token){

    let headersss = new Headers();
    headersss.append('Content-Type', 'application/json');

    let params = {
      subscriptions: ["aaaaaa","bbbb","ccccc"],
    }

    let postParams={
      form_product: JSON.stringify(params)
    }
    
    const options = {
      method: "post",
      data: { id: 12, message: 'test' },
      headers: {}
    };



    this.http.post('https://webscraper-project.herokuapp.com/user/' + token, params,options).subscribe((response) => {
      this.shared.presentToast(JSON.stringify(response));
    });

  }


  async getToken() {
    let token;
  
    if (this.platform.is('android')) {
    token = await this.firebase.getToken();
    this.sendUserData(token);
    }
  
    if (this.platform.is('ios')) {
    token = await this.firebase.getToken();
    await this.firebase.grantPermission();
    }

    this.saveToken(token);
    }
  
    private saveToken(token) {
    if (!token) return;
  
    const devicesRef = this.afs.collection('devices');
  
    const data = {
    token,
    userId: 'testUserId'
    };
  
    return devicesRef.doc(token).set(data);
    }
  
    onNotifications() {
      return this.firebase.onNotificationOpen();
    }
}
