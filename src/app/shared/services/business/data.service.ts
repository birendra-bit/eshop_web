import { IResponse } from './../../models/IResponse';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

// @Injectable({
//   providedIn: 'root'
// })
export class DataService {

  headers: HttpHeaders;
   
    constructor(private url:string, private httpClient: HttpClient) {}
  
   generateHeader(token){
     return new HttpHeaders(
      {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization':'Bearer '+ localStorage.getItem('token')  
      })
   }

  getData():Observable<IResponse> {

    this.headers = this.generateHeader(localStorage.getItem('token'))

    return this.httpClient.get<IResponse>(`${this.url}`,{headers:this.headers}).pipe(
      catchError(this.handleError)
    )
  }

  createData(data):Observable<IResponse>{

    this.headers = this.generateHeader(localStorage.getItem('token'))

    return this.httpClient.post<IResponse>(`${this.url}`,JSON.stringify(data),{headers:this.headers}).pipe(
      catchError(this.handleError)
    )
  }

  getDataByID(id):Observable<IResponse>{

    this.headers = this.generateHeader(localStorage.getItem('token'))

    return this.httpClient.get<IResponse>(`${this.url}/${id}`,{headers:this.headers}).pipe(
      catchError(this.handleError)
    )
  }

  updateData(id,data):Observable<IResponse>{

    this.headers = this.generateHeader(localStorage.getItem('token'))

    return this.httpClient.patch<IResponse>(`${this.url}/${id}`,JSON.stringify(data),{headers:this.headers}).pipe(
      catchError(this.handleError)
    )
  }

  deleteData(id):Observable<IResponse>{

    this.headers = this.generateHeader(localStorage.getItem('token'))

    return this.httpClient.delete<IResponse>(`${this.url}/${id}`,{headers:this.headers}).pipe(
      catchError(this.handleError)
    )
  }

  login(credentials):Observable<IResponse> {

    this.headers = this.generateHeader(localStorage.getItem('token'))

    return this.httpClient.post<IResponse>(`${this.url}` + '/login',
      JSON.stringify(credentials), { headers: this.headers }).pipe(
        catchError(this.handleError)
      )
  }

  signUp(credentials):Observable<IResponse> {

    this.headers = this.generateHeader(localStorage.getItem('token'))

    return this.httpClient.post<IResponse>(`${this.url}` + '/signup',
      JSON.stringify(credentials), { headers: this.headers }).pipe(
        catchError(this.handleError))
  }

  handleError = (error) => {
    console.log(error)
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
