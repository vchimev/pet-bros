import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { User } from './user.model';
import { FirebaseCommon } from './firebase.common';


@Injectable()
export class FirebaseService implements FirebaseCommon {
  private _user$: Observable<User>;
  public get user$(): Observable<User> {
    return this._user$;
  }

  constructor(private afAuth: AngularFireAuth, private af: AngularFireDatabase) {
    this._user$ = this.afAuth.authState
    .map(user => {
      return {
        email: user.email,
        displayName: (user.displayName) ? user.displayName : 'no-name',
        defaultSearchLocation: 'Boston, Ma',
        favouritePets: [],
        favouriteShelters: []
      };
    });
  }

  async signIn(email: string, password: string): Promise<User> {
    const user = await this.afAuth.auth.signInWithEmailAndPassword(email, password);

    return {
      email: user.email,
      displayName: (user.displayName) ? user.displayName : 'no-name',
      defaultSearchLocation: 'Boston, Ma',
      favouritePets: [],
      favouriteShelters: []
    };
  }

  async register(email: string, password: string, displayName: string): Promise<User> {
    const user = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    await this.afAuth.auth.currentUser.updateProfile({
      displayName,
      photoURL: null
    });

    return {
      email: user.email,
      displayName: displayName,
      defaultSearchLocation: 'Boston, Ma',
      favouritePets: [],
      favouriteShelters: []
    };
  }

  logout(): Promise<any> {
    return Promise.resolve(null);
  }

  resetPassword(email: string): Promise<any> {
    return Promise.resolve(null);
  }
}
