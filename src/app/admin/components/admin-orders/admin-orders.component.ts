import { UserService } from './../../../shared/services/business/user.service';
import { ShoppingCartService } from './../../../shared/services/business/shopping-cart.service';
import { ShoppingCartItem } from './../../../shared/models/shopping-cart-item';
import { AppUser } from './../../../shared/models/app-user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  orders: any = {}
  user: AppUser[]=[];
  shoppingCartItems: ShoppingCartItem[]=[]

  constructor(private shoppingCartService: ShoppingCartService,
    private userService: UserService) { }

  ngOnInit() {
    this.shoppingCartService.getData().subscribe(cart => {
      this.shoppingCartItems = cart.data as ShoppingCartItem[]
    })
    this.userService.getData().subscribe(user => {
      this.user = user.data as AppUser[];
    })
  }

  getName(id) {
    let index = this.user.findIndex(user => user._id === id)
    return index > -1 ? this.user[index].name : 'null';
  }

  getQty(index) {
    let qty = 0;
    if (index > -1)
    qty = this.shoppingCartItems[index].items.map(cart => cart.quantity).reduce((prev, next) => prev + next);
    return qty;
  }
}
