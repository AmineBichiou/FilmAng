import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  erreur=0;
    err=0;
  user = new User();
  constructor(private authService : AuthService,
    private router: Router) { }
  ngOnInit(): void {
  }
  /*onLoggedin(){
    console.log(this.user);
    let isValidUser: Boolean = this.authService.SignIn(this.user);
    if (isValidUser)
    this.router.navigate(['/']);
    else
    //alert('Login ou mot de passe incorrecte!');
    this.erreur=1;
    }*/
    onLoggedin()
    {
        this.authService.login(this.user).subscribe({
            next: (data) => {
                let jwToken = data.headers.get('Authorization')!;
                this.authService.saveToken(jwToken);
                this.router.navigate(['/']);
            },
            error: (err: any) => {
                this.err = 1;
            }
        });
    }

}
