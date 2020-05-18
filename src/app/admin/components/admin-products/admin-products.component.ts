import { Product } from './../../../shared/models/product';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingCartItem } from 'src/app/shared/models/shopping-cart-item';
import { ProductService } from 'src/app/shared/services/business/product.service';

@Component({
  selector: 'admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  productList: Product[];
  filteredProduct: Product[];
  subscription: Subscription;
  items : ShoppingCartItem[];

  constructor(private productdService: ProductService) {

  }

  filter(query: string) {
    this.filteredProduct = (query) ?
      this.productList.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : this.productList;
  }

  ngOnDestroy() {
  }

  ngOnInit() {
    this.productdService.getData().subscribe(product=>{
      this.filteredProduct = this.productList = product.data as Product[]
    })
  }
}
