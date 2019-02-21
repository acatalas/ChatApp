import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { User } from '../classes/user';
import { Router } from '@angular/router';
import { Alert } from '../classes/alert';
import { AlertService } from './alert.service';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthService {

  public currentUser: Observable<User | null>;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private afAuth: AngularFireAuth,
    private db: AngularFirestore
    ) { 
      this.currentUser = this.afAuth.authState.pipe(switchMap((user) => {
        if(user) {
          return this.db.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      }))
  }

  public signup(firstName: string, lastName: string, email: string, password: string): Observable<boolean> {
    return from(
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/'${user.user.uid}`);
        const updatedUser = {
          id: user.user.uid,
          email: user.user.email,
          firstName,
          lastName,
          photoUrl: 'https://firebasestorage.googleapis.com/v0/b/chat-8673c.appspot.com/o/400.jpg?alt=media&token=168a8552-c051-438d-82c7-93d5b3184eac'
        }
        userRef.set(updatedUser);
        return true;
      })
      .catch((err) => false)
    );
  }

  public login(email: string, password: string): Observable<boolean> {
    return from(
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => true)
      .catch((err) => false)
    );
  }

  public logout(): void{
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
      this.alertService.alerts.next(new Alert("You have been signed out."));
    });
  }
}
