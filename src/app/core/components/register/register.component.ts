import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  
  isPasswordMatched:boolean=false;

  constructor(private authService:AuthService,
        private router:Router) { }

  ngOnInit(): void {
  }

  signup(credentials){

    this.authService.signUp(credentials).subscribe(res =>{
      this.router.navigate(['/login'])
    })
  }

  confirmPassword(credentials){
    this.isPasswordMatched = credentials.password === credentials.confirmpassword;
  }
}
