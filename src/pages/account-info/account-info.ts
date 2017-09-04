import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as WC from 'woocommerce-api';
import { SearchPage } from '../search/search';
import { QRCodeComponent } from 'angular2-qrcode';

@IonicPage({})
@Component({
  selector: 'page-account-info',
  templateUrl: 'account-info.html',
})
export class AccountInfoPage {

  WooCommerce: any;
  userInfo: any;
  searchQuery: string = "";
  profile: any;
  value : string = "";
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public alertCtrl: AlertController) {

    this.profile = {};
    this.profile.billing_address = {};
    this.profile.shipping_address = {};

    this.WooCommerce = WC({
      url: "http://tipid.tips",
      consumerKey: "ck_e9a7a40da85adaeb9525c9c4870b7b4e6a62b230",
      consumerSecret: "cs_983d964e5dcb49d9ea850c89d27bd2e3b651f197"
    });

    this.storage.get("userLoginInfo").then( (userLoginInfo)=> {
      this.userInfo = userLoginInfo.user;

      let email = userLoginInfo.user.email;

      this.WooCommerce.getAsync("customers/email/" + email).then( (data)=> {
        this.profile = JSON.parse(data.body).customer;
        console.log(this.profile);
        this.value = this.profile.id + " " + this.profile.first_name + " " + this.profile.last_name;
        console.log(this.value);
      })
    })
    
  }

  onSearch(event) {
    if(this.searchQuery.length > 0) {
      this.navCtrl.push(SearchPage, {"searchQuery": this.searchQuery});
    }
  }

  signout() {
    this.storage.remove("userLoginInfo").then( ()=> {
    })
  }

}
