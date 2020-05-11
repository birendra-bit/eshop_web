import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/product';
import { ShoppingCartService } from '../../services/business/shopping-cart.service';
import { Items } from '../../models/shopping-cart-item';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {

  @Input('product') product: Product;
  @Input('quantity') quantity:number;

  constructor(private shoppingCartService: ShoppingCartService) {
    // console.log('items',this.cartItems)
  }

  addToCart() {
    this.shoppingCartService.updateItemQuantity(this.product,1).subscribe(res=>{
      this.quantity += 1
      this.shoppingCartService.getTotalItemsCount()
    })
  }

  removeFromCart() {
    this.shoppingCartService.updateItemQuantity(this.product,-1).subscribe(res=>{
      this.quantity -= 1
      this.shoppingCartService.getTotalItemsCount()
    })  }

  getQuantity() {
  }

  ngOnInit(): void {
  }

}
