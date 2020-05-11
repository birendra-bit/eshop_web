import { AppUser } from './../../models/app-user';
import { ShoppingCartService } from 'src/app/shared/services/business/shopping-cart.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserService } from '../business/user.service';
import { decode } from 'querystring';



@Injectable({
  providedIn: 'root'
})
export class AuthService {  
  headers;
  @Output() updateUser = new EventEmitter();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private shoppingCartService: ShoppingCartService,
    private httpClient: HttpClient) {

    this.headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });

  }

  logout() {
    localStorage.removeItem('token');
    this.updateUser.emit();
    this.shoppingCartService.currenItemsCount(0);
    this.router.navigate(['/'])
  }

  async loginWithGoogle() {}

  isLoggedIn():boolean {
    
    let token = localStorage.getItem('token');
    if(! token) return false;

    let decode = jwt_decode(token)

    if(decode.exp === undefined )
      return false

    const date = new Date(0)
    let tokenExp = date.setUTCSeconds(decode.exp)

    if( tokenExp.valueOf() > new Date().valueOf()) return true;

    return false;

  }

  login(credentials) {
    
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    localStorage.setItem('returnUrl', returnUrl);

    return this.httpClient.post(environment.url + '/login',
      JSON.stringify(credentials), { headers: this.headers }).pipe(
        catchError(this.handleError)
      )
  }

  signUp(credentials) {

    return this.httpClient.post(environment.url + '/signup',
      JSON.stringify(credentials), { headers: this.headers }).pipe(
        catchError(this.handleError))
  }

  decodeUser():  Observable<AppUser> {
    let token = localStorage.getItem('token');
    if(token){
    return of(jwt_decode(token));
    }
    return of(null);
  }
  
  handleError = (error) => {

    let errorMessage = '';
    console.log('error ',error)
    if (error.error instanceof ErrorEvent) {
      
      errorMessage = `Error: ${error.error.message}`;

    } else {

      errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.message}`;

    }

    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
