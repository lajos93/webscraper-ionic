import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  constructor(public http: HttpClient) {
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
