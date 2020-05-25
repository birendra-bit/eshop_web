import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppToastComponent } from './components/app-toast/app-toast.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { AdminAuthGuardService } from './services/auth/admin-auth-guard.service';
import { AuthService } from './services/auth/auth.service';
import { CategoryService } from './services/business/category.service';
import { OrderService } from './services/business/order.service';
import { ProductService } from './services/business/product.service';
import { ShoppingCartService } from './services/business/shopping-cart.service';
import { UserService } from './services/business/user.service';
import { ToastService } from './services/toast.service';



@NgModule({
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent,
    AppToastComponent
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
    NgbModule,
    AppToastComponent
  ],
  providers:[
    AuthService,
    AuthService,
    UserService,
    AdminAuthGuardService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService,
    ToastService
  ]
})
export class SharedModule { }
