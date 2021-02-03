import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  user;
  authStatusSub;
  currentAuthStatus;

  constructor(
    private firebaseAuth: AngularFireAuth,
    public router: Router,
  ) { 
    this.authStatusSub = new BehaviorSubject(this.user);
    this.currentAuthStatus = this.authStatusSub.asObservable();
    
    this.checkAuthState();
  }

  checkAuthState(){
    this.firebaseAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        this.authStatusSub.next(user);
      } else {
        this.authStatusSub.next(null);
      }
    });
  }

  signInWithGoogle() {
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    
    return this.firebaseAuth.signInWithPopup(provider).then(()=>{
      this.checkAuthState();
      this.router.navigate(['/']).then(()=>{
        window.location.reload();
      });
    });
  }

  logout(){
    return this.firebaseAuth.signOut().then(() => {
      this.checkAuthState();
      this.router.navigate(['/']).then(()=>{
        window.location.reload();
      });
    })
  }
}