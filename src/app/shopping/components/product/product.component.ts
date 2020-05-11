import { AuthService } from './../../../shared/services/auth/auth.service';
import { ShoppingCartService } from 'src/app/shared/services/business/shopping-cart.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../../shared/services/business/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { ShoppingCartItem, Items } from 'src/app/shared/models/shopping-cart-item';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products:Product[]=[];
  filteredProduct:Product[]=[];
  cartItems:Items[];
  category: any={}

  constructor( private productService: ProductService,
      private shoppingCartService:ShoppingCartService, 
      private route: ActivatedRoute,
      private auth:AuthService) {}

  ngOnInit(){

    if(this.auth.isLoggedIn()){
      
      this.shoppingCartService.getData().subscribe(items=>{
        this.cartItems = [...items[0].items]
      })
    }

    this.productService.getData().subscribe((product:Product[])=>{
      this.products = product;
      this.route.queryParamMap.subscribe(params => {
        this.category = params.get('category');
        this.applyFilter();
      })
    })
  }

  getItem(product_id){

    if(this.cartItems === undefined ) return 0;
    
      let index = this.cartItems.findIndex(item=> item.product_id === product_id );

      return index > -1 ? 
       this.cartItems[index].quantity : 0 
  }
  private applyFilter(){
    this.filteredProduct = (this.category) ? 
    this.products.filter(p => p.category === this.category.toLowerCase()) : this.products;
  }
}
