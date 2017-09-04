import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


import firebase = require('nativescript-plugin-firebase');

import { FirebaseUserServiceCommon } from './firebase.common';
import { FirebaseUser, FirebaseUserUpdateOptions } from './firebase-user.model';
import { AuthStateData, User, AuthStateChangeListener } from 'nativescript-plugin-firebase';

let userSubject: BehaviorSubject<FirebaseUser>;

@Injectable()
export class FirebaseUserService implements FirebaseUserServiceCommon {
  public get currentUser(): FirebaseUser {
    return userSubject.value;
  }

  public get user$(): Observable<FirebaseUser> {
    return userSubject;
  }

  private prepareUserObservable() {
    if (!userSubject) {
      userSubject = new BehaviorSubject<FirebaseUser>(null);

      const authStateListener: AuthStateChangeListener = {
        onAuthStateChanged: data => {
          const user = (data.loggedIn) ? this.parseUser(data.user) : null;
          userSubject.next(user);
        }
      };

      firebase.addAuthStateListener(authStateListener);
    }
  }

  private parseUser(user: User): FirebaseUser {
    if (user) {
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

    return null;
  }

  constructor() {
    this.prepareUserObservable();
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
    this.currentUser.displayName = (options.displayName) ? options.displayName : this.currentUser.displayName;
    this.currentUser.photoURL = (options.photoURL) ? options.photoURL : this.currentUser.photoURL;
    this.currentUser.email = (options.email) ? options.email : this.currentUser.email;
  }

  // private pushUpdate(options: FirebaseUserUpdateOptions) {
  //   const userClone = this.cloneCurrentUser();

  //   userClone.displayName = (options.displayName) ? options.displayName : userClone.displayName;
  //   userClone.photoURL = (options.photoURL) ? options.photoURL : userClone.photoURL;
  //   userClone.email = (options.email) ? options.email : userClone.email;

  //   userSubject.next(userClone);
  // }

  // private cloneCurrentUser(): FirebaseUser {
  //   return {...this.currentUser};
  // }
}
