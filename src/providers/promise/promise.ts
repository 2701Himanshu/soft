import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the PromiseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PromiseProvider {

	_API_BASE_URL : string = "http://115.124.98.243/~mindzshop/api/";
	// _API_BASE_URL : string = "http://192.168.0.204/emptracking/api/";
	_API_URL_PREFIX : string = "/format/json";

	constructor(public http: HttpClient) {
		console.log('Hello PromisesProvider Provider');
	}

	getProdDetails(data){
		return this.http.post(this._API_BASE_URL+"barcode/productfrombarcode"+this._API_URL_PREFIX, data);
	}

	orderProduct(data){
		return this.http.post(this._API_BASE_URL+"barcode/insertorder"+this._API_URL_PREFIX, data);
	}

	orderList(data){
		return this.http.post(this._API_BASE_URL+"barcode/orderdetails"+this._API_URL_PREFIX, data);
	}
}


