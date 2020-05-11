import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    BsNavbarComponent, 
    LoginComponent, 
    RegisterComponent, 
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    NgbModule,
    SharedModule
  ],
  exports:[
    BsNavbarComponent
  ]
})
export class CoreModule { }
