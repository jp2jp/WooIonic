import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';

@IonicPage({})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  username: string;
  password: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public toastCtrl: ToastController, public storage: Storage, public alertCtrl: AlertController) {

    this.username = "";
    this.password = "";
  }

  ionViewDidLoad() {
  }

  login(){
    this.http.get("http://tipid.tips/api/auth/generate_auth_cookie/?insecure=cool&username=" + this.username + "&password=" + this.password)
    .subscribe( (res)=> {
      console.log(res.json());

      let response = res.json();

      if(response.error) {
        this.toastCtrl.create({
          message: response.error,
          duration: 3000
        }).present();
        return;
      }

      this.storage.set("userLoginInfo", response).then( (data)=> {
        
        if(this.navParams.get("next")) {
          this.navCtrl.push(this.navParams.get("next"));
        } else {
          this.navCtrl.pop();
        }

      })

    });
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }

}
