import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from 'src/app/shared/services/business/shopping-cart.service';
import { Product } from './../../../shared/models/product';
import { Items } from './../../../shared/models/shopping-cart-item';
import { AuthService } from './../../../shared/services/auth/auth.service';
import { ProductService } from './../../../shared/services/business/product.service';

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
       if(items.data.length )
        this.cartItems =  [...items.data[0].items];
      })
    }

    this.productService.getData().subscribe(product=>{
      this.products = product.data as Product[]
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
