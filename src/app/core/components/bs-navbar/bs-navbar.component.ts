import { map } from 'rxjs/operators';
import { ShoppingCartItem } from './../../../shared/models/shopping-cart-item';
import { Observable, Subscription } from 'rxjs';
import { AppUser } from './../../../shared/models/app-user';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ShoppingCartService } from 'src/app/shared/services/business/shopping-cart.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  // totalCartItemsCount: number;
  subscription: Subscription;
  shoppingCartItems: ShoppingCartItem;
  shoppingCartItemCount: number

  constructor(public auth: AuthService, private shoppingCartService: ShoppingCartService) { }
  logout() {
    this.auth.logout();
  }

  ngOnInit() {
    this.auth.decodeUser().subscribe(appUser=>{
      this.appUser = appUser})
      this.auth.updateUser.subscribe( e =>{
      this.subscription = this.auth.decodeUser().subscribe(appUser=>{
        this.appUser = appUser
     })
    })

    this.shoppingCartService.currentCartItemsCount.subscribe(count =>{
      this.shoppingCartItemCount = count.totalCartItemsCount
    })
  }
}
