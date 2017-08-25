import { NgModule } from '@angular/core';
import { FirebaseUserService } from './firebase-user.service';

// This needs to be converted to a Token
export const firebaseConfig = {
  storageBucket: 'gs://pet-bros.appspot.com/'
};

@NgModule({
  providers: [
    FirebaseUserService
  ]
})
export class FirebaseModule { }
