import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from 'firebase';
import { Observable } from 'rxjs/index';
import { Router } from '@angular/router';
 
export interface Credentials {
  email: string;
  password: string;
}
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  admin = false;
  readonly authState$: Observable<User | null> = this.fireAuth.authState;
 
  constructor(
    private fireAuth: AngularFireAuth, 
    private afStorage: AngularFirestore, 
    private router: Router,) {

    fireAuth.authState.subscribe(auth => {
      if(auth) {
        // alert("Zalogowano");   
        console.log('logged in - zmiana stanu');
        console.log(auth);
      } else {
        // alert("Wylogowano"); 
        console.log('not logged in - zmiana stanu');
        console.log(auth);
      }
    });
    console.log("Start");
  }

  
  login(email: string, password: string) {
    return this.fireAuth.auth.signInWithEmailAndPassword(email, password);
  }
  
  logUser(){
    this.getCurrentUserDoc().set({ uid: this.currentUser().uid }, { merge: true });
    this.fetchAdminRights();
  }
 
  register(email: string, password: string) {
    this.fireAuth.auth.createUserWithEmailAndPassword(email, password).then(
      () => this.login(email, password)
    );
  }
 
  logout() {
    this.fireAuth.auth.signOut();
    localStorage.removeItem('admin');
    this.router.navigate(['/home']);
  }
 
  currentUser(): User | null {
    return this.fireAuth.auth.currentUser;
  }
 
  isAdmin(): boolean {
    return !!localStorage.getItem('admin');
  }
 
  private getCurrentUserDoc(): AngularFirestoreDocument | null {
    return this.currentUser() && this.afStorage.doc(`/users/${this.currentUser().uid}`);
  }
 
  private fetchAdminRights() {
    const userDoc = this.getCurrentUserDoc();
    if (userDoc) {
      userDoc.get()
        .subscribe(x => !!(x.data() as any).admin && localStorage.setItem('admin', 'true'));
    }
  }
}
