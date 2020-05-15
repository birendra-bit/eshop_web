import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root'
// })
export class DataService {

  headers: HttpHeaders;

  constructor(private url:string, private httpClient: HttpClient) {
    this.headers = new HttpHeaders(
      {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization':'Bearer '+ localStorage.getItem('token')  
      })
   }

  getData(){
    return this.httpClient.get(`${this.url}`,{headers:this.headers}).pipe(
      catchError(this.handleError)
    )
  }

  getItems(items){
    return this.httpClient.get(`${this.url}/${items}`,{headers:this.headers}).pipe(
      catchError(this.handleError)
      )
  }

  createData(data){
    return this.httpClient.post(`${this.url}`,JSON.stringify(data),{headers:this.headers}).pipe(
      catchError(this.handleError)
    )
  }

  getDataByID(id){
    return this.httpClient.get(`${this.url}/${id}`,{headers:this.headers}).pipe(
      catchError(this.handleError)
    )
  }

  updateData(id,data){
    return this.httpClient.patch(`${this.url}/${id}`,JSON.stringify(data),{headers:this.headers}).pipe(
      catchError(this.handleError)
    )
  }

  deleteData(id){
    return this.httpClient.delete(`${this.url}/${id}`,{headers:this.headers}).pipe(
      catchError(this.handleError)
    )
  }

  handleError = (error) => {

    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {

      errorMessage = `Error: ${error.error.message}`;

    } else {
    
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.message}`;

    }

    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
