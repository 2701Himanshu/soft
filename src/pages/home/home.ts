import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ProdDetailsPage } from '../prod-details/prod-details';
import { OrderListPage } from '../order-list/order-list';
import { PromiseProvider } from '../../providers/promise/promise';
import { UtilsProvider } from '../../providers/utils/utils';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private data:{};
  private prod_list: {};s
  constructor(
    private barcodeScanner: BarcodeScanner, 
    private promise: PromiseProvider,
    private utils: UtilsProvider,
    public navCtrl: NavController) {
  	this.getProductList();
  }

  scanProduct(){
    /*barcode_final_code*/
    this.barcodeScanner.scan().then(barcodeData => {
        if(barcodeData.text == ""){
          this.utils.showAlertMessage({
            type: 'alert',
            message: 'There is some problem in barcode scanning, please re-scan it.'
          });
          return;
        }
        var dataToSend = {
          barcode: barcodeData.text
          // barcode:"ABCD234EDS"
        };
        this.utils.initLoading();
        this.promise.getProdDetails(dataToSend).subscribe(
          (data)=> {
            this.utils.hideLoading();
            if(data == 'Something Went Wrong'){
              this.utils.showAlertMessage({
                type: 'alert',
                message: 'No product available!'
              });
              return;
            }
            this.navCtrl.push(ProdDetailsPage, {data: data});
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
  	}).catch(err => {
  	  this.utils.showAlertMessage({
        type: 'alert',
        message: 'There is some problem in barcode scanning, please re-scan it.'
      });
  	});


    /*api call*/
    // var dataToSend = {
    //   // barcode: barcodeData.text
    //   barcode:"ABCD234EDS"
    // };
    // this.utils.initLoading();
    // this.promise.getProdDetails(dataToSend).subscribe(
    //   (data)=> {
    //     this.utils.hideLoading();
    //     this.navCtrl.push(ProdDetailsPage, {data: data});
    //   },
    //   (error)=> {
    //     console.log(error);
    //     this.utils.hideLoading();
    //     this.utils.showAlertMessage({
    //       type: 'alert',
    //       message: 'There is some error with internet connection, please re-scan the barcode.'
    //     });
    //     debugger;
    //   }
    // );

    /* page push*/
    // this.navCtrl.push(ProdDetailsPage, {data: 'dataToSend'});
  }

  navToOrderList(){
    this.navCtrl.push(OrderListPage);
  }

  getImageUrl(url, name){
    return 'http://115.124.98.243/~mindzshop/'+url+name;
  }

  openProductDetail(id){
    this.utils.initLoading();
    var dataToSend = {
      proid : id
    }
    this.promise.getProductDetails(dataToSend).subscribe(
      (data)=> {
        this.utils.hideLoading();
        console.log(data);
        this.navCtrl.push(ProdDetailsPage, {data: data});
      },
      (error)=> {
        debugger;
        this.utils.hideLoading();
        this.utils.showAlertMessage({
          type: 'alert',
          message: 'There is some error with internet connection, please re-scan the barcode.'
        });
        console.log(error);
      }
    );
  }

  getProductList(){
    this.utils.initLoading();
    this.promise.productListForHome({}).subscribe(
      (data)=> {
        this.utils.hideLoading();
        this.prod_list = data['product'];
      },
      (error)=> {
        debugger;
        this.utils.hideLoading();
        this.utils.showAlertMessage({
          type: 'alert',
          message: 'There is some error with internet connection, please re-scan the barcode.'
        });
        console.log(error);
      }
    );
  }

  refreshProductList(refresher){
    this.promise.productListForHome({}).subscribe(
      (data)=> {
        refresher.complete();
        this.prod_list = data['product'];
      },
      (error)=> {
        debugger;
        refresher.complete();
        this.utils.showAlertMessage({
          type: 'alert',
          message: 'There is some error with internet connection, please re-scan the barcode.'
        });
      }
    );
  }
}
