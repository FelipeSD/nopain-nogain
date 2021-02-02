import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any;
  
  constructor(
    private firebaseAuth: AngularFireAuth,
    public router: Router,  
  ) { 
    this.checkAuthState();
  }

  checkAuthState(){
    this.firebaseAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
        JSON.parse(localStorage.getItem('user'));
        this.router.navigate(['/']);
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  signInWithGoogle() {
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    
    return this.firebaseAuth.signInWithPopup(provider).then(()=>{
      this.checkAuthState();
    });
  }

  logout(){
    return this.firebaseAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/']);
    })
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }
}