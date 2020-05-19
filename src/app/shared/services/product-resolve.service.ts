import { IResponse } from './../models/IResponse';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ProductService } from './business/product.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductResolveService implements Resolve<IResponse> {

  constructor(private productService:ProductService) { }

  resolve(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<IResponse> {  
    return this.productService.getData().pipe(
      take(1),
      map(product=> product )
    )
  } 
}
