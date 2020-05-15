import { Product } from './../../../shared/models/product';
import { ProductService } from './../../../shared/services/business/product.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'src/app/shared/models/shopping-carts';
import { ShoppingCartService } from 'src/app/shared/services/business/shopping-cart.service';
import { ShoppingCartItem } from 'src/app/shared/models/shopping-cart-item';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  shoppingItemCount: number;
  totalPrice: number = 0;
  product: Product[] = [];
  shoppingCartItems: ShoppingCartItem
  constructor(private shoppingCartService: ShoppingCartService,
    private productService: ProductService) { }

  ngOnInit() {
    this.shoppingCartService.currentCartItemsCount.subscribe(count => {
      this.shoppingItemCount = count.totalCartItemsCount
    })
    let productArray = [];
    this.productService.getData().subscribe((product: Product[]) => {
      productArray = product;
    })
    this.shoppingCartService.getData().subscribe(items => {
        this.shoppingCartItems = { ...items[0] } as ShoppingCartItem
        // this.shoppingItemCount = this.shoppingCartItems.items.map(item=>item.quantity).reduce((prev,next)=> prev+next)
        this.shoppingCartItems.items.map(item=>{
          let index = productArray.findIndex(product=> product._id === item.product_id );
          
          if(index > -1 ){
            this.product.push(productArray[index]);
            this.totalPrice += productArray[index].price * item.quantity
          } 
        })
    })
  }

  getQuantity(id){
    let index = this.shoppingCartItems.items.findIndex(item=>item.product_id === id )
    return index > -1 ? this.shoppingCartItems.items[index].quantity : 0;
  }

  getTotalItems(){

  }

  clearCart() {
    // this.shoppingCartService.clearCart();
  }

}
