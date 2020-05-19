import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductResolveService } from './../shared/services/product-resolve.service';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from '../shared/services/auth/auth-guard.service';
import { AdminAuthGuardService } from '../shared/services/auth/admin-auth-guard.service';
import { CategoryResolveService } from '../shared/services/category-resolve.service';



@NgModule({
  declarations: [
    AdminOrdersComponent, 
    AdminProductsComponent, 
    ProductFormComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path:'admin/orders',
        component:AdminOrdersComponent,
        canActivate:[AuthGuardService,AdminAuthGuardService] 
      },
      {
        path:'admin/products/new',
        component:ProductFormComponent, 
        resolve:{
          product: ProductResolveService
        },
        canActivate:[AuthGuardService,AdminAuthGuardService]
      },
      {
        path:'admin/products/:id',
        component:ProductFormComponent, 
        resolve:{
          category: CategoryResolveService
        },
        canActivate:[AuthGuardService,AdminAuthGuardService]
      },
      {
        path:'admin/products',
        component:AdminProductsComponent,
        canActivate:[AuthGuardService,AdminAuthGuardService] 
      }
    ])
  ],
  providers:[
    AuthGuardService,
    AdminAuthGuardService
  ]
})
export class AdminModule { }
