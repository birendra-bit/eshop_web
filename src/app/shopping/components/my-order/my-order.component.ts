import { ProductService } from './../../../shared/services/business/product.service';
import { Product } from './../../../shared/models/product';
import { ShoppingCartService } from './../../../shared/services/business/shopping-cart.service';
import { Items } from './../../../shared/models/shopping-cart-item';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {
  product:Product[]=[]
  items: Items[]=[];
  totalPrice:number=0;
  totalItems:number=0;
  constructor(private shoppingCartService:ShoppingCartService,
    private productService:ProductService) { }

  ngOnInit(): void {
    this.shoppingCartService.getData().subscribe(cart=>{
      this.items = cart.data[0].items;
    })
    this.productService.getData().subscribe(p=>{
      this.product = p.data;
    })
    this.shoppingCartService.currentCartItemsCount.subscribe(count=>{
      this.totalItems = count.totalCartItemsCount;
    })
  }

  getName(id){
    let index = this.product.findIndex(p=> p._id === id )
    return index > -1 ? this.product[index].title : 'null';
  }

  getPrice(id) : number {
    let index = this.product.findIndex(p=> p._id === id )
    return index > -1 ? this.product[index].price : 1;
  }

  getTotal(){
    let total = 0;
    this.items.forEach(item=>{
       total += item.quantity * this.getPrice(item.product_id)
    })
    return total
  }
}
