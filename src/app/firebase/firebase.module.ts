import { NgModule } from '@angular/core';

// New imports to update based on AngularFire2 version 4
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FirebaseUserService } from './firebase-user.service';
import { FirebaseDataService } from './firebase-data.service';

// This needs to be converted to a Token
export const firebaseConfig = {
  apiKey: 'AIzaSyCAqVp-nSsAv5CQfIduc6vVHYoFCQ-P1_U',
  authDomain: 'pet-bros.firebaseapp.com',
  databaseURL: 'https://pet-bros.firebaseio.com',
  projectId: 'pet-bros',
  storageBucket: 'pet-bros.appspot.com',
  messagingSenderId: '234930243940'
};

@NgModule({
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  exports: [
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  providers: [
    FirebaseUserService,
    FirebaseDataService
  ]
})
export class FirebaseModule { }
