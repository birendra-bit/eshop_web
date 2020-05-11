import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { Subscription } from 'rxjs';
import { ShoppingCartItem } from 'src/app/shared/models/shopping-cart-item';
import { ProductService } from 'src/app/shared/services/business/product.service';

@Component({
  selector: 'admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  productList: Product[]=[];
  filteredProduct: Product[]=[];
  subscription: Subscription;
  items : ShoppingCartItem[]=[];

  constructor(private productdService: ProductService) {

  }

  filter(query: string) {
    this.filteredProduct = (query) ?
      this.productList.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : this.productList;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {

    this.subscription = this.productdService.getData().subscribe((product:Product[])=>{
      this.filteredProduct = this.productList = product;
    })
  }
}
