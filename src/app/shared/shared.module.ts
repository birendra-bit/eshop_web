import { DataService } from './services/business/data.service';
import { AuthService } from './services/auth/auth.service';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http'
import { UserService } from './services/business/user.service';
import { AdminAuthGuardService } from './services/auth/admin-auth-guard.service';
import { CategoryService } from './services/business/category.service';
import { ProductService } from './services/business/product.service';
import { ShoppingCartService } from './services/business/shopping-cart.service';
import { OrderService } from './services/business/order.service';



@NgModule({
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    HttpClientModule
  ],
  exports:[
    ProductCardComponent,
    ProductQuantityComponent,
    CommonModule,
    FormsModule,
    NgbModule
  ],
  providers:[
    AuthService,
    AuthService,
    UserService,
    AdminAuthGuardService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ]
})
export class SharedModule { }
