import { Observable } from 'rxjs';
import { CategoryService } from './business/category.service';
import { IResponse } from './../models/IResponse';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryResolveService implements Resolve<IResponse> {

  constructor(private categoryService:CategoryService) { }
  resolve(route: ActivatedRouteSnapshot,state: RouterStateSnapshot):Observable<IResponse>{
    return this.categoryService.getData().pipe(
      take(1),
      map(category=> category )
    )
  }
}
