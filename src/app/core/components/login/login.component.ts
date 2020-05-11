import { ShoppingCartService } from 'src/app/shared/services/business/shopping-cart.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, 
    private route:ActivatedRoute , 
    private router: Router, 
    private shoppingcartService:ShoppingCartService ) { }

  loginWithGoogle() {
    this.auth.loginWithGoogle();
  }

  login(credential) {

      this.auth.login(credential).subscribe(res=>{

        let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');

        localStorage.setItem('returnUrl',returnUrl);
        console.log('login',res)
        let user = Object.entries(res);
        localStorage.setItem('token', user[0][1]);

        this.shoppingcartService.getTotalItemsCount();

        this.auth.updateUser.emit();
        
        this.router.navigate([returnUrl || '/home']);
      
     })
  }
  ngOnInit(){
    if( this.auth.isLoggedIn()){
      this.router.navigate(['/product'])
    }
  }
}
