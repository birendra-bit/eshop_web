import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'eshopWeb';
  constructor(authService: AuthService, private router:Router){
    // authService.decodeUser().subscribe(user=>{
    //   if( user ){
    //     let returnUrl = localStorage.getItem('returnUrl');
    //     console.log(returnUrl)
    //     if(returnUrl)
    //       router.navigateByUrl(returnUrl);
    //     else
    //       this.router.navigate(['/']);
    //   }
    // })
  }
}
