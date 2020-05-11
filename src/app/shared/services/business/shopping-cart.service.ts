import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ShoppingCartItem } from './../../models/shopping-cart-item';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { Injectable, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService extends DataService {
  shoppingCartItems: ShoppingCartItem;
  private totalCartItemsCount = new BehaviorSubject({ totalCartItemsCount:0 });
  currentCartItemsCount = this.totalCartItemsCount.asObservable();

  constructor(httpClient: HttpClient) {
    super(environment.url + '/shoppingCart', httpClient);
    this.getTotalItemsCount();
  }

  getTotalItemsCount() {
    if (localStorage.getItem('token')) {

      this.getData().subscribe(items => {

          if(Object.keys(items).length === 0) this.currenItemsCount(0);
          else
          {
            this.shoppingCartItems = { ...items[0] } as ShoppingCartItem
            let totalItems = this.shoppingCartItems.items.map(item => item.quantity).reduce((prev, next) => prev + next);
            this.currenItemsCount({totalCartItemsCount:totalItems});
          }
      })
    } else {
      this.currenItemsCount({ totalCartItemsCount:0 });
    }
  }

  currenItemsCount(itemsCount: any) {
    this.totalCartItemsCount.next(itemsCount);
  }

  updateItemQuantity(product: Product, change: number) {

    return this.createData({items:{change:change,product_id:product._id}});
  }
}
