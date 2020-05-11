import { environment } from './../../../../environments/environment';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends DataService {

  constructor(httpClient:HttpClient) {
    super(environment.url+'/product',httpClient);
   }

}
