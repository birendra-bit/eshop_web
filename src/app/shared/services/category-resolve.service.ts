import { Observable } from 'rxjs';
import { CategoryService } from './business/category.service';
import { IResponse } from './../models/IResponse';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CategoryResolveService implements Resolve<IResponse> {

  constructor(private categoryService:CategoryService) { }
  resolve(route: ActivatedRouteSnapshot):Observable<IResponse>{
    return this.categoryService.getData();
  }
}
