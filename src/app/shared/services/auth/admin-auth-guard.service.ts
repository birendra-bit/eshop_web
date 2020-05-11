import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private authService:AuthService,private router:Router) { }

  canActivate(route, state: RouterStateSnapshot) : Observable<boolean> {
    return this.authService.decodeUser().pipe(
      map(user=> user.isAdmin))
    }
}
