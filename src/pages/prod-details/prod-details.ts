import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import { OrderPage } from '../order/order';

/**
 * Generated class for the ProdDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-prod-details',
  templateUrl: 'prod-details.html',
})
export class ProdDetailsPage {
	details;
	totalAmt:number;
	amount:number;
	quantity:number;
  constructor(
  	public navCtrl: NavController,
  	private utils: UtilsProvider,
  	public navParams: NavParams) {
  }

  ionViewCanEnter() {
    this.details = this.navParams.get('data');
    this.amount = parseFloat(this.details.productMRP);
    this.totalAmt = parseFloat(this.details.productMRP);
    this.quantity = 1;
  }

  getImageUrl(path, name){
  	return 'http://115.124.98.243/~mindzshop/'+path+''+name;																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																										
  }

  increaseQty(){
  	if(this.quantity >= parseInt(this.details.proQnty)){
  		this.utils.showToastMessage({
  			message: 'Product quantity exceeded!',
	  		duration: 'short',
	 		type: 'failure',
  		});
  		return;
  	};
  	this.quantity++;
  	this.totalAmt = this.totalAmt + this.amount;
  }

  decreaseQty(){
  	if(this.quantity <= 1) return;
  	this.quantity--;
  	this.totalAmt = this.totalAmt - this.amount;
  }

  order(data){
    this.navCtrl.push(OrderPage, {data: data, amt: this.totalAmt, qty: this.quantity});
  }
}
