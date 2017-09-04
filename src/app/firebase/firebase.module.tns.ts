import { NgModule } from '@angular/core';
import { FirebaseUserService } from './firebase-user.service';
import { FirebaseDataService } from './firebase-data.service';

import firebase = require('nativescript-plugin-firebase');

// This needs to be converted to a Token
export const firebaseConfig = {
  storageBucket: 'gs://pet-bros.appspot.com/'
};

firebase.init({
  persist: false,
  iOSEmulatorFlush: true
})
.then(
  (instance) => console.log('firebase.init done'),
  (error) => console.log('firebase.init error: ' + error)
);

@NgModule({
  providers: [
    FirebaseUserService,
    FirebaseDataService
  ]
})
export class FirebaseModule { }
