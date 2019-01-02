import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PromiseProvider } from '../../providers/promise/promise';
import { UtilsProvider } from '../../providers/utils/utils';

/**
 * Generated class for the OrderListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-list',
  templateUrl: 'order-list.html',
})
export class OrderListPage {

  orders;
  constructor(
  	public navCtrl: NavController,
  	private promise: PromiseProvider, 
  	private utils: UtilsProvider, 
  	public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.getOrderList();
  }

  getOrderList(){
  	this.utils.initLoading();
  	var dataToSend = {
  		userid: '2'
  	};
  	this.promise.orderList(dataToSend).subscribe(
  		(data)=> {
  			this.utils.hideLoading();
  			this.orders = data;
  		},
  		(error)=> {
  			console.log(error);
  			this.utils.hideLoading();
  			this.utils.showAlertMessage({
	          type: 'alert',
	          message: 'There is some error with internet connection, please re-scan the barcode.'
	        });
  			debugger;
  		}
  	);
  };

  getImageUrl(url){
  	return url;
  }

}
