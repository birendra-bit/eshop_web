import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthGuardService } from '../shared/services/auth/auth-guard.service';
import { SharedModule } from '../shared/shared.module';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { MyOrderComponent } from './components/my-order/my-order.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { ProductComponent } from './components/product/product.component';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';
import { ShoppingCartSummaryComponent } from './components/shopping-cart-summary/shopping-cart-summary.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ProductFilterComponent } from './components/product/product-filter/product-filter.component';


@NgModule({
  declarations: [
    ProductComponent, 
    CheckOutComponent, 
    MyOrderComponent, 
    OrderSuccessComponent,
    ShippingFormComponent, 
    ShoppingCartComponent, 
    ShoppingCartSummaryComponent, ProductFilterComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path:'products',
        component: ProductComponent
      },
      {
        path:'shopping-cart', 
        component: ShoppingCartComponent
      },
      {
        path:'check-out',
        component:CheckOutComponent, 
        canActivate:[AuthGuardService]
      },
      {
        path:'order-success/:id',
        component:OrderSuccessComponent,
        canActivate:[AuthGuardService]
      },
      {
        path:'my/orders',
        component:MyOrderComponent,
        canActivate:[AuthGuardService] 
      },
    ])
  ],
  providers:[
    AuthGuardService
  ]
})
export class ShoppingModule { }
