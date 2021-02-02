import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(/logout/gi.test(this.router.url)){
      this.onLogout();
    }
  }

  onSignIn() {
    this.authService.signInWithGoogle();
  }

  onLogout(){
    this.authService.logout();
  }

}
