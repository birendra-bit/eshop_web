import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService extends DataService {

  constructor(httpClient:HttpClient) {
    super(`${environment.url}/`,httpClient)
   }
}
