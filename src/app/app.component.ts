import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Gym app';
  isLoggedIn;

  constructor(
    private authService: AuthService,
  ){
  }

  ngOnInit(){
    this.authService.checkAuthState();
    this.authService.currentAuthStatus.subscribe(authStatus => {
      this.isLoggedIn = authStatus;
    });
  }
}
