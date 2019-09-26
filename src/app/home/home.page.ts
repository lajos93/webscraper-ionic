import { Component } from '@angular/core';
import { QueryService } from '../../services/query/query.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public Products:any=[];
  public Date:Date;
  public ProductDetails:any=[];
  public ProductArrays:any=[];

  productcreds = {
    name: '',
  };

  constructor(private queryprovider: QueryService,private storage: Storage) {


      console.log(this.Products);
      storage.get('dateSent').then((val) => {

        this.Date = val;
        console.log('inside',this.Date)

        var today = new Date();
        var mn = today.getMinutes();
        var hh = today.getHours();
        var dd = today.getDate();
        var mm = today.getMonth()+1;
        var yyyy = today.getFullYear();

        console.log(hh+':'+mn+'   /'+dd,'/'+mm,'/'+yyyy)

        var dateSent = new Date(this.Date);
        var dateSent_mn = dateSent.getMinutes();
        var dateSent_hh = dateSent.getHours();
        var dateSent_dd = dateSent.getDate();
        var dateSent_mm = dateSent.getMonth()+1;
        var dateSent_yyyy = dateSent.getFullYear();
        console.log(dateSent_hh+':'+dateSent_mn+'   /'+dateSent_dd,'/'+dateSent_mm,'/'+dateSent_yyyy)

        if (dateSent_yyyy=yyyy){
          console.log('year is the same')
          if (dateSent_mm==mm){
            console.log('month is the same',dateSent_mm,mm)
            if (dateSent_dd==dd){
              console.log('day is the same',dateSent_dd,dd)

              if (dateSent_hh==hh){
                console.log('hour is the same',dateSent_hh,hh)
                if (dateSent_mn==mn){
                  console.log('minute is the same')
                }
                else{
                  console.log('minute is different',dateSent_mn,mn)
                }
              }
            }
            else {
              console.log('it was set earlier, gotta query it again',dateSent_dd,dd)
            }
          }

        }

      });

    }

    addToArray(product){
      product = this.productcreds.name
      console.log(product)
      if (this.productcreds.name != ''){
        this.Products.push({name:product});
      }
      this.productcreds.name = ''
    }


    getProducts(product) {

      if (this.productcreds.name != ''){
        product = this.productcreds.name
        console.log('this is thisproducts',this.Products);
        this.Products.push({name:product});

        this.productcreds.name = ''
      }

      var i;
      for (i = 0; i < this.Products.length; i++) {
        var productName = this.Products[i].name;


        if(this.ProductArrays.find(o => o.name === productName)){
          console.log('Already added');
        }
        else{
          this.queryprovider.getproducts(productName).then(data => {
            console.log('data',data);
            this.ProductArrays.push({name:data[1],details:data[0],amount:data[0].length,alreadyAdded:true});
            console.log('ProductArrays',this.ProductArrays);
          })
        }
      }
  }

    getTheDate(){
      var today = new Date();
      var mn = today.getMinutes();
      var hh = today.getHours();
      var dd = today.getDate();
      var mm = today.getMonth()+1;
      var yyyy = today.getFullYear();
      console.log(hh+':'+mn+'   /'+dd,'/'+mm,'/'+yyyy)

    }
  }

 


