import { Injectable } from '@angular/core';
import { FirebaseUser, FirebaseUserService, FirebaseUserUpdateOptions } from './firebase';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
  constructor(private firebaseUserService: FirebaseUserService) { }

  get user$(): Observable<FirebaseUser> {
    return this.firebaseUserService.user$;
  }

  signIn(email: string, password: string): Promise<FirebaseUser> {
    return this.firebaseUserService.signIn(email, password);
  }

  async register(email: string, password: string, displayName: string, defaultSearchLocation: string): Promise<string> {
    const key = await this.firebaseUserService.register(email, password);

    this.firebaseUserService.updateUserDetails({
      displayName: displayName
    });

    return key;
  }

  logout(): Promise<any> {
    return this.firebaseUserService.logout();
  }

  resetPassword(email: string): Promise<any> {
    return this.firebaseUserService.resetPassword(email);
  }

  updateUserDetails(options: FirebaseUserUpdateOptions) {
    return this.firebaseUserService.updateUserDetails(options);
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
