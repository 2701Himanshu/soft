import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PromiseProvider } from '../../providers/promise/promise';
import { UtilsProvider } from '../../providers/utils/utils';
import { ConfirmOrderPage } from '../confirm-order/confirm-order';

/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {

  constructor(public navCtrl: NavController, 
  	private promise:PromiseProvider,
  	private utils:UtilsProvider,
  	public navParams: NavParams) {
  }
  
  details;
  user;
  total_amt: number;
  total_qty: number;
  dataToSend;

  ionViewCanEnter() {
    this.details = this.navParams.get('data');
    this.total_amt = this.navParams.get('amt');
    this.total_qty = this.navParams.get('qty');
    this.user = {
    	name:'',
		email: '',
		contact: '',
    	address: '',
    	city: '',
    	pincode: ''
    }
  }

  getImageUrl(path, name){
  	return 'http://115.124.98.243/~mindzshop/'+path+''+name;																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																										
  }

  buy(){
  	this.dataToSend = {
		userid: "2",
		name: this.user.name,
		contact: this.user.contact,
		email: this.user.email,
		address: this.user.address,
		city: this.user.city,
		pin: this.user.pincode,
		productid: this.details.ProId,
		catid: this.details.CatId,
		productname: this.details.ProductName,
		singleamt: this.details.productMRP,
		totalamt: this.total_amt,
		qty: this.total_qty,
		vendorid: this.details.manufactureId,
		imgurl: this.getImageUrl(this.details.imgurl, this.details.Image)
	};
	this.utils.initLoading();
	this.promise.orderProduct(this.dataToSend).subscribe(
		(data)=> {
			this.utils.hideLoading();
			if(data['lastid']){
				this.navCtrl.pop();
				this.navCtrl.push(ConfirmOrderPage, {data: this.dataToSend});
			}
		},
		(error)=> {
			console.log(error);
			this.utils.hideLoading();
			this.utils.showAlertMessage({
	          type: 'alert',
	          message: 'There is some error with internet connection, please re-scan the barcode.'
	        });
			debugger;
		},
	);
  }
}
