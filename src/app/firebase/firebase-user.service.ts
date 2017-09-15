import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';

import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase/app';

import { FirebaseUser, FirebaseUserUpdateOptions } from './firebase-user.model';
import { FirebaseUserServiceCommon } from './firebase.common';

@Injectable()
export class FirebaseUserService implements FirebaseUserServiceCommon {
  public get currentUser(): FirebaseUser {
    return this.parseUser(this.afAuth.auth.currentUser);
  }

  private _user$: Observable<FirebaseUser>;
  public get user$(): Observable<FirebaseUser> {
    return this._user$;
  }


  constructor(private afAuth: AngularFireAuth) {
    this._user$ = this.prepareUserObservable();
  }

  private prepareUserObservable(): Observable<FirebaseUser> {
    return this.afAuth.authState
    .map(user => this.parseUser(user));
  }

  private parseUser(user: User): FirebaseUser {
    if (user) {
      return {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        isAnonymous: user.isAnonymous,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL,
        providerData: user.providerData.map(provider => { return  { providerId: provider.providerId }; }),
        refreshToken: user.refreshToken
      };
    }

    return null;
  }

  public async signIn(email: string, password: string): Promise<FirebaseUser> {
    const user = await this.afAuth.auth.signInWithEmailAndPassword(email, password);

    return this.parseUser(user);
  }

  public async register(email: string, password: string): Promise<string> {
    const user = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);

    return user.uid;
  }

  public async logout(): Promise<any> {
    await this.afAuth.auth.signOut();
    return;
  }

  public async resetPassword(email: string): Promise<any> {
    await this.afAuth.auth.sendPasswordResetEmail(email);
    return;
  }

  public async updateUserDetails(options: FirebaseUserUpdateOptions): Promise<any> {
    const currentUser: User = this.afAuth.auth.currentUser;

    if (options.displayName || options.photoURL) {
      await currentUser.updateProfile({
        displayName: options.displayName,
        photoURL: options.photoURL
      });
    }

    if (options.email) {
      await currentUser.updateEmail(options.email);
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

  //   this._userObserver.next(userClone);
  // }

  // private cloneCurrentUser(): FirebaseUser {
  //   return {...this.currentUser};
  // }
}
