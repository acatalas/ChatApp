import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class ChatroomService {

//List of chatrooms from the Firebase database
public chatrooms: Observable<any>;

  constructor(private db: AngularFirestore) {
    this.chatrooms = db.collection('chatrooms').valueChanges();
  }

}
