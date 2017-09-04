import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App, ModalController } from 'ionic-angular';
import { Storage } from'@ionic/storage';

@IonicPage({})
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage  {

  cartItems: any[] = [];
  total: any;
  showEmptyCartMessage: boolean = false;
  searchQuery: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public storage: Storage, public viewCtrl: ViewController, public appCtrl: App) {
   console.log("controller");
    this.total = 0.0;

    this.storage.ready().then( ()=> {
      this.storage.get("cart").then( (data)=> {
        this.cartItems = data;
        //console.log(this.cartItems);

        if(this.cartItems.length >0){
          this.cartItems.forEach( (item, index)=>{
            this.total = this.total + (item.product.price * item.qty);
          })
        } else{
          this.showEmptyCartMessage = true;
        }

      });
    })
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad CartPage");
  }

  removeFromCart(item, i) {
    let price = item.product.price;
    let qty = item.qty;
    this.cartItems.splice(i, 1);
    this.storage.set("cart", this.cartItems).then( ()=> {
      this.total = this.total - (price * qty);
    });
    if(this.cartItems.length==0) {
      this.showEmptyCartMessage = true;
    }
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  checkout(){
    this.storage.get("userLoginInfo").then( (data)=> {
      if(data !=null) {
        this.viewCtrl.dismiss();
        this.appCtrl.getRootNav().push('CheckoutPage');
      } else {
        this.navCtrl.push('LoginPage', {next: 'CheckoutPage'});
      }
    })
  }

  onSearch(event) {
    if(this.searchQuery.length > 0) {
      this.navCtrl.push('SearchPage', {"searchQuery": this.searchQuery});
    }
  }


}
