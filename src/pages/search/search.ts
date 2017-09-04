import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import * as WC from 'woocommerce-api';

@IonicPage({})
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  searchQuery: string = "";
  WooCommerce: any;
  products: any[] = [];
  page: number = 2;
  cantSearch: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
    console.log(this.navParams.get("searchQuery"));
    this.searchQuery = this.navParams.get("searchQuery");

    this.WooCommerce = WC({
      url: "http://tipid.tips",
      consumerKey: "ck_e9a7a40da85adaeb9525c9c4870b7b4e6a62b230",
      consumerSecret: "cs_983d964e5dcb49d9ea850c89d27bd2e3b651f197"
    });

    this.WooCommerce.getAsync("products?filter[q]=" + this.searchQuery).then((searchData)=> {
      this.products = JSON.parse(searchData.body).products;
      console.log(this.products);
      if(this.products.length==0){
        this.cantSearch = true;
        console.log(this.cantSearch);
      }
      else if(this.products.length>0){
        this.cantSearch = false;
        console.log(this.cantSearch);
      }
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  loadMoreProducts(event) {

    this.WooCommerce.getAsync("products?filter[q]=" + this.searchQuery + "&page=" + this.page).then((searchData)=> {
      this.products = this.products.concat(JSON.parse(searchData.body).products);

      if(JSON.parse(searchData.body).products < 10) {
        event.enable(false);

        // this.toastCtrl.create({
        //   message: "No more products.",
        //   duration: 3000
        // }).present();
      }

      event.complete();
      this.page ++;
    });

  }

  openProductPage(product) {
    this.navCtrl.push('ProductDetailsPage', {"product": product});
  }
  

}
