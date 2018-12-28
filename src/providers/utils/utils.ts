import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of'; 
import { LoadingController, AlertController, ToastController } from 'ionic-angular';

/*
  Generated class for the UtilsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilsProvider {

	dialogTitle: string = "EMP Track";
	loader;
	constructor(public loadingCtrl: LoadingController,
				private alertCtrl: AlertController,
				private toastCtrl: ToastController,
				public httpClient: HttpClient) { 
	}

	/*
	 * Calculate the distance between two coordinates
	 * return: distance in meter
	 */
	rad(x) {
		return x * Math.PI / 180;
	}
	getDistance(p1, p2) {
		var R = 6378137; // Earth’s mean radius in meter
		var dLat = this.rad(p2.latitude - p1.latitude);
		var dLong = this.rad(p2.longitude - p1.longitude);
		var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		  Math.cos(this.rad(p1.latitude)) * Math.cos(this.rad(p2.latitude)) *
		  Math.sin(dLong / 2) * Math.sin(dLong / 2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		var d = R * c;
		return d; // returns the distance in meter
	}


	/*
	 * Functions to handle the loading popup
	 */
	initLoading(){
		this.loader = this.loadingCtrl.create({
			spinner: 'crescent',
			content: `Please wait...`
		});
		this.loader.present();
  	};
	hideLoading(){
		this.loader.dismiss();
	}

	/*
	 * Storage Helper
	 */
	saveData(key, data){
		window.localStorage.setItem(key, JSON.stringify(data));
	}
	getData(key){
		var Data = JSON.parse(window.localStorage.getItem(key));
		return Data;
	}
	updateWholeKey(StorageKey, value){
		this.removeData(StorageKey);
		this.saveData(StorageKey, value);
	}
	updateData(StorageKey, key, value){
	    var Data = JSON.parse(window.localStorage.getItem(StorageKey));
	    Data[key] = value;
	    window.localStorage.setItem(StorageKey, JSON.stringify(Data));
	}
	removeData(key){
	    window.localStorage.removeItem(key);
	}

	/*
	 * Get user id
	 */
	getUserID(){
		var data = JSON.parse(window.localStorage.getItem('user'));
		return data["e_id"];
	}
	/*
	 * input: coordinates
	 * output: address string/text
	 * get address string from lat/long
	 * AIzaSyD8IqfEjV_PJdrXSsGp6hu8gyUISeR9kcw
	 */
	getAddressString(data){
		return this.httpClient.get('https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyD8IqfEjV_PJdrXSsGp6hu8gyUISeR9kcw&latlng='+data.latitude+','+data.longitude+'&sensor=true');
		// return result;
	}


	/*
	 * Create a popup with radio button input
	 * input: title, radio button options & callback function on selection
	 * output: return selected option value
	 */
	radioDialog(title, options, callback) {
		let alert = this.alertCtrl.create();
	    alert.setTitle(title);

	   	for(var i=0; i<options.length; i++){
	   		var option = options[i];
	   		alert.addInput({
		      type: 'radio',
		      label: option.label,
		      value: option.value,
		      checked: option.checked ? option.checked : false
		    });
	   	}

	    alert.addButton('Cancel');
	    alert.addButton({
	      text: 'OK',
	      handler: callback
	    });
	    alert.present();
	}

	// show user dialog messages
	// payload : {
	// 		type: confirm
	//  	message: 
	// 		callback: 
	// }
	showAlertMessage(payload){
		if(payload.type == "confirm"){
			const confirm = this.alertCtrl.create({
		      title: this.dialogTitle,
		      message: payload.message,
		      buttons: [
		        {
		          text: 'No',
		          handler: () => {
		            console.log('Disagree clicked');
		          }
		        },
		        {
		          text: 'Yes',
		          handler: payload.callback
		        }
		      ]
		    });
		    confirm.present();
		}

		if(payload.type == "alert"){
			const alert = this.alertCtrl.create({
		      title: this.dialogTitle,
		      subTitle: payload.message,
		      buttons: [{
		          text: 'Ok',
		          handler: () => {
		          	if(payload.callback){
		            	payload.callback();
		          	}
		          }
		        }]
		    });
		    alert.present();
		}
	};

	/*  payload : {
	 *  	message:
	 * 		duration: short, long, medium
	 *		callback:
	 *		type: success, failure
	 *	}
	 */
	showToastMessage(payload){
		var duration;
		if(payload.duration == "short"){
			duration = 2000;
		} else if(payload.duration == "medium"){
			duration = 5000;
		}

		var color = payload.type == "success" ? 'success-toast-message' : 'failure-toast-message';

		var toast = this.toastCtrl.create({
          message: payload.message,
          duration: duration,
          position: 'bottom',
          cssClass: color
        })

        toast.onDidDismiss(() => {
        	if(payload.callback) payload.callback();
	  	});

	  	toast.present();
	}
}
