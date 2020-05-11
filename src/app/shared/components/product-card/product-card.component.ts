import { ShoppingCartService } from 'src/app/shared/services/business/shopping-cart.service';
import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/product';
import { Items } from '../../models/shopping-cart-item';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input('product') product: Product
  @Input('show-action') showAction = true;
  @Input('quantity') quantity:number;

  constructor(private shoppingCartService:ShoppingCartService) { }

  ngOnInit() {
   }

  addToCart(){
    this.shoppingCartService.updateItemQuantity(this.product,1).subscribe(res=>{
      this.quantity += 1 
      this.shoppingCartService.getTotalItemsCount();
    })
  }
}
