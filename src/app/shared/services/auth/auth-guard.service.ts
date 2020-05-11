import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router:Router) { }

  canActivate(route, state:RouterStateSnapshot): Observable<boolean>{
    
    let returnUrl = state.url
    
    return this.authService.decodeUser().pipe(
      map(user =>{

        let date = new Date(0);

        if(date.setUTCSeconds(user.exp).valueOf() > new Date().valueOf()) return true;

        this.router.navigate(['/login'],{queryParams:{returnUrl : returnUrl},queryParamsHandling:'merge'});
        return false;
      })
    )
  }
}
