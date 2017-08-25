import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import firebase = require('nativescript-plugin-firebase');

import { FirebaseUserServiceCommon } from './firebase.common';
import { FirebaseUser, FirebaseUserUpdateOptions } from './firebase-user.model';
import { AuthStateData, User } from 'nativescript-plugin-firebase';

@Injectable()
export class FirebaseUserService implements FirebaseUserServiceCommon {
  private _userSubject: BehaviorSubject<FirebaseUser>;
  public get user$(): Observable<FirebaseUser> {
    return this._userSubject;
  }

  constructor() {
    this._userSubject = new BehaviorSubject<FirebaseUser>(null);

    firebase.init({
      persist: false,
      iOSEmulatorFlush: true,

      onAuthStateChanged: (data: AuthStateData) => {
        if (data.loggedIn) {
          const currentUser: FirebaseUser = this.parseUser(data.user);
          this._userSubject.next(currentUser);
        } else {
          this._userSubject.next(null);
        }
    }

    }).then(
      (instance) => console.log('firebase.init done'),
      (error) => console.log('firebase.init error: ' + error)
    );
  }

  private parseUser(user: User): FirebaseUser {
    return {
      uid: user.uid,
      displayName: user.name,
      email: user.email,
      emailVerified: user.emailVerified,
      isAnonymous: user.anonymous,
      phoneNumber: (user as any).phoneNumber,
      photoURL: user.profileImageURL,
      providerData: user.providers.map(provider => { return  { providerId: provider.id }; }),
      refreshToken: user.refreshToken
    };
  }

  public async signIn(email: string, password: string): Promise<FirebaseUser> {
    const user = await firebase.login({
      type: firebase.LoginType.PASSWORD,
      passwordOptions: { email, password }
    });

    return this.parseUser(user);
  }

  public async register(email: string, password: string): Promise<string> {
    const createResult = await firebase.createUser({ email, password });
    return createResult.key;
  }

  logout(): Promise<any> {
    return firebase.logout();
  }

  resetPassword(email: string): Promise<any> {
    return firebase.resetPassword({ email });
  }

  public async updateUserDetails(options: FirebaseUserUpdateOptions): Promise<any> {

    if (options.displayName || options.photoURL) {
      await firebase.updateProfile({
        displayName: options.displayName,
        photoURL: options.photoURL
      });
    }

    if (options.email) {
      // await firebase.updateEmail(options.email);
      console.log('firebase.updateEmail is currently not supported by nativescript-plugin-firebase');
    }

    this.pushUpdate(options);

    return;
  }

  private pushUpdate(options: FirebaseUserUpdateOptions) {
    const userClone = this.cloneCurrentUser();

    userClone.displayName = (options.displayName) ? options.displayName : userClone.displayName;
    userClone.photoURL = (options.photoURL) ? options.photoURL : userClone.photoURL;
    userClone.email = (options.email) ? options.email : userClone.email;

    this._userSubject.next(userClone);
  }

  private cloneCurrentUser(): FirebaseUser {
    return {...this._userSubject.value};
  }
}
