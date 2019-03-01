import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../classes/user';
import { Alert } from '../classes/alert';
import { AlertService } from '../services/alert.service';
import { Observable, of, from } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
/**
 * Service used for creating a new user and adding it to the Firebase database, 
 * authenticating a user and logging out a user.
 */
export class AuthService {

  //User using the application. Is null if the user is not logged in
  public currentUser: Observable<User | null>;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private afAuth: AngularFireAuth,
    private db: AngularFirestore
  ) {
    this.currentUser = this.afAuth.authState.pipe(switchMap((user) => {
      //if the user is logged in
      if (user) {
        //returns the user from the database
        return this.db.doc<User>(`users/${user.uid}`).valueChanges();
      } else {
        return of(null);
      }
    }))
  }

  //Creates a new user in the database, also storing their first, last name and profile picture.
  public signup(firstName: string, lastName: string, email: string, password: string): Observable<boolean> {
    return from(
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      //if the user has been created successfully
        .then((user) => {
          const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${user.user.uid}`);
          //saves the user's names and photo to the user's document
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
        //returns false if the user creation has failed
        .catch((err) => false)
    );
  }

  //Logs in a user to the application
  public login(email: string, password: string): Observable<boolean> {
    return from(
      //Checks the email / password combination
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then((user) => true)
        .catch((err) => false)
    )
  }

  //Logs a user out of the application and takes them to the login page
  public logout(): void {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
      this.alertService.alerts.next(new Alert('You have been signed out.'));
    });
  }
}
