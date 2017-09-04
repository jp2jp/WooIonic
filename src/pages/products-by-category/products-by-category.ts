import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController, ModalController} from 'ionic-angular';
import * as WC from 'woocommerce-api';
import { Storage } from '@ionic/storage';

@IonicPage({})
@Component({
  selector: 'page-products-by-category',
  templateUrl: 'products-by-category.html',
})
export class ProductsByCategoryPage {

  WooCommerce: any;
  products: any[];
  page: number;
  category: any;
  searchQuery: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public modalCtrl: ModalController, public storage: Storage) {

    this.page = 1;
    this.category = this.navParams.get("category");

    this.WooCommerce = WC({
      url: "http://tipid.tips",
      consumerKey: "ck_e9a7a40da85adaeb9525c9c4870b7b4e6a62b230",
      consumerSecret: "cs_983d964e5dcb49d9ea850c89d27bd2e3b651f197"
    });

    this.WooCommerce.getAsync("products?filter[category]=" + this.category.slug).then( (data) => {
      this.products = JSON.parse(data.body).products;
      console.log(JSON.parse(data.body));
    }, (err) => {
      console.log(err);
    })
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsByCategoryPage');
  }

  loadMoreProducts(event) {

    if(event==null) {
      this.page = 1;
    }
    else
      this.page ++;
    this.WooCommerce.getAsync("products?filter[category]=" + this.category.slug + "&page=" + this.page).then( (data) => {
      let temp = (JSON.parse(data.body).products);

      this.products = this.products.concat(JSON.parse(data.body).products);

      if(JSON.parse(data.body).products.length < 10) {
        event.enable(false);
        // this.toastCtrl.create({
        //   message: "No more products.",
        //   duration: 3000
        // }).present();
      }
      
    }, (err) => {
      console.log(err);
    })
  }

  openProductPage(product) {
    this.navCtrl.push('ProductDetailsPage', {"product": product});
  }

  openCart() {
    this.modalCtrl.create('CartPage').present();
  }

  addToCart(product){
    
    this.storage.get("cart").then((data)=> {
      
      if(data==null || data.length==0){
        data = [];
        data.push({
          "product": product,
          "qty": 1,
          "amount": parseFloat(product.price)
        });
      } else{
        let added = 0;
        for(let i=0; i<data.length; i++) {
          if(product.id == data[i].product.id) {
            console.log("Product is already in the cart.");
            let qty = data[i].qty;
            data[i].qty = qty+1;
            data[i].amount = parseFloat(data[i].amount) + parseFloat(data[i].price);
            added = 1;
          }
        }
        if(added==0){
          data.push({
          "product": product,
          "qty": 1,
          "amount": parseFloat(product.price)
          });
        }
      }

      this.storage.set("cart", data).then( ()=> {
        console.log("Cart updated.");
        console.log(data);
        this.toastCtrl.create({
          message: "Product added to cart.",
          duration: 3000
        }).present();
      })

    });

  }

  onSearch(event) {
    if(this.searchQuery.length > 0) {
      this.navCtrl.push('SearchPage', {"searchQuery": this.searchQuery});
    }
  }

}
