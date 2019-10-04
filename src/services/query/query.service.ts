import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  constructor(
    public http: HttpClient,
    public shared: SharedService
    ) {
    console.log('Hello QueryProvider Provider');
  }

  getproducts(product) {
    return new Promise((resolve, reject) => {
      var headers = new Headers();

      headers.append('Content-Type', 'application/json');
        this.http.get('https://webscraper-project.herokuapp.com/prod/' + product,).subscribe(data => {
            //if(data.json().success)
                resolve([data,product]);
                console.log([data,product]);

            //  else
                reject(false);
        });
    })
  }


}
