import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import firebase = require('nativescript-plugin-firebase');

import { FirebaseCommon } from './firebase.common';
import { User } from './user.model';

@Injectable()
export class FirebaseService implements FirebaseCommon {
  private _userSubject: BehaviorSubject<User>;
  public get user$(): Observable<User> {
    return this._userSubject;
  }

  constructor() {
    firebase.init({
      persist: false,
      iOSEmulatorFlush: true
    }).then(
      (instance) => console.log('firebase.init done'),
      (error) => console.log('firebase.init error: ' + error)
    );

    this._userSubject = new BehaviorSubject<User>(null);
  }

  signIn(email: string, password: string): Promise<User> {
    return firebase.login({
      type: firebase.LoginType.PASSWORD,
      passwordOptions: { email, password }
    })
    .then( result => {
      const currentUser = {
        email: result.email,
        displayName: result.name,
        defaultSearchLocation: 'Boston, MA',
        favouritePets: [],
        favouriteShelters: []
      };

      this._userSubject.next(currentUser);

      return currentUser;
    });
  }

  register(email: string, password: string, displayName: string): Promise<User> {
    return firebase.createUser({ email, password })
    .then( result => {
      const currentUser = {
        email: email,
        displayName: displayName,
        defaultSearchLocation: 'Boston, MA',
        favouritePets: [],
        favouriteShelters: []
      };

      this._userSubject.next(currentUser);

      return currentUser;
    });
  }

  logout(): Promise<any> {
    this._userSubject.next(null);
    return firebase.logout();
  }

  resetPassword(email: string): Promise<any> {
    return firebase.resetPassword({ email });
  }
}
