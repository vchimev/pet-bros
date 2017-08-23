import { Injectable } from '@angular/core';
import { User, FirebaseService } from './firebase';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
  constructor(private firebase: FirebaseService) {
    // this.user$ = this.afAuth.authState;
  }

  get user$(): Observable<User> {
    return this.firebase.user$;
  }

  signIn(email: string, password: string): Promise<User> {
    return this.firebase.signIn(email, password);
  }

  register(email: string, password: string, displayName: string, defaultSearchLocation: string): Promise<User> {
    return this.firebase.register(email, password, displayName);
  }

  logout(): Promise<any> {
    return this.firebase.logout();
  }

  resetPassword(email: string): Promise<any> {
    return this.firebase.resetPassword(email);
  }

  log(name: string, result: any) {
    if (result) {
      // console.log(`***${name}*** ${JSON.stringify(result)}`);
      console.log(`***${name}***`);
      console.log(result);
    } else {
      console.log(`***${name}*** no result returned`);
    }
  }
}
