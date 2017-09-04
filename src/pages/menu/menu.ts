import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import * as WC from 'woocommerce-api';

import { Storage } from '@ionic/storage';

@IonicPage({})
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  WooCommerce: any;
  categories: any[];
  @ViewChild('content') childNavCtrl: NavController;
  loggedIn: boolean;
  avatar: boolean;
  profile: any;
  user: any;
  homePage: any = Component;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public modalCtrl: ModalController) {
    
    this.homePage = 'HomePage';
    this.categories = [];
    this.user = {};

    this.WooCommerce = WC({
      url: "http://tipid.tips",
      consumerKey: "ck_e9a7a40da85adaeb9525c9c4870b7b4e6a62b230",
      consumerSecret: "cs_983d964e5dcb49d9ea850c89d27bd2e3b651f197"
    });

    this.WooCommerce.getAsync("products/categories").then((data) => {
      //console.log(JSON.parse(data.body).product_categories);
      let temp: any[] = JSON.parse(data.body).product_categories;

      for(let i=0; i<temp.length; i++){
        if(temp[i].parent==0){
         
          if(temp[i].slug=="music"){
            temp[i].icon = "md-musical-note";
          }
          if(temp[i].slug=="clothing"){
            temp[i].icon = "ios-shirt";
          }
          if(temp[i].slug=="posters"){
            temp[i].icon = "ios-image";
          }
          if(temp[i].slug=="tshirts"){
            temp[i].icon = "md-shirt";
          }
          if(temp[i].slug=="hoodies"){
            temp[i].icon = "ios-shirt-outline";
          }
          if(temp[i].slug=="accessories"){
            temp[i].icon = "md-bowtie";
          }

          this.categories.push(temp[i]);
        }
      }

    }, (err) =>{
      console.log(err);
    })

  }

  ionViewDidEnter() {
    this.storage.ready().then( ()=> {

      this.storage.get("userLoginInfo").then( (userLoginInfo)=> {
        if(userLoginInfo !=null) {
          console.log("User logged in..");
          this.user = userLoginInfo.user;
          console.log(this.user);
          this.loggedIn = true;
        } else {
          console.log("No user found.");
          this.user = {};
          this.loggedIn = false;
        }
      })

    })
  }

  goHome() {
    this.childNavCtrl.setRoot('HomePage');
  }

  openCategoryPage(category) {
    //this.navCtrl.setRoot(ProductsByCategoryPage,{"category": category});
    this.childNavCtrl.setRoot('ProductsByCategoryPage',{"category": category});
  }

  openPage(pageName: String){

    if(pageName=="signup") {
      this.navCtrl.push('SignupPage');
    }
    if(pageName=="login") {
      this.navCtrl.push('LoginPage');
    }
    if(pageName=="logout") {
      this.storage.remove("userLoginInfo").then( ()=> {
        this.user = {};
        this.loggedIn = false;
      })
    }
    if(pageName=="cart") {
      let modal = this.modalCtrl.create('CartPage');
      modal.present();
    }

  }

  accountInfo() {
    this.childNavCtrl.setRoot('AccountInfoPage');
  }


}
