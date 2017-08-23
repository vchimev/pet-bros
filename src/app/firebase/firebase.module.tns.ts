import { NgModule } from '@angular/core';
import { FirebaseService } from './firebase.service';

// This needs to be converted to a Token
export const firebaseConfig = {
  storageBucket: 'gs://pet-bros.appspot.com/'
};

@NgModule({
  providers: [
    FirebaseService
  ]
})
export class FirebaseModule { }
