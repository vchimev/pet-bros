import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';

import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase/app';

import { FirebaseUser, FirebaseUserUpdateOptions } from './firebase-user.model';
import { FirebaseUserServiceCommon } from './firebase.common';

@Injectable()
export class FirebaseUserService implements FirebaseUserServiceCommon {
  private _currentUser: FirebaseUser; // used to send an update to user$ subscribers, when user details get updated

  private _userObserver: Subscriber<FirebaseUser>;
  private _user$: Observable<FirebaseUser>;
  public get user$(): Observable<FirebaseUser> {
    return this._user$;
  }

  constructor(private afAuth: AngularFireAuth) {

    this._user$ = new Observable<FirebaseUser>(observer => {
      this._userObserver = observer;

      const subscription = this.afAuth.authState
      .map(user => this.parseUser(user))
      .do(user => this._currentUser = user)
      .subscribe(user => observer.next(user));

      return () => subscription.unsubscribe();
    });
  }

  private parseUser(user: User): FirebaseUser {
    console.log('Parse:' + ((user) ? user.displayName : 'null'));
    if (user) {
      return {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        isAnonymous: user.isAnonymous,
        phoneNumber: (user as any).phoneNumber,
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

    // TODO: Find a way to send an update with the updated user info
    // this._userObserver.next(currentUser);

    return;
  }

  private pushUpdate(options: FirebaseUserUpdateOptions) {
    const userClone = this.cloneCurrentUser();

    userClone.displayName = (options.displayName) ? options.displayName : userClone.displayName;
    userClone.photoURL = (options.photoURL) ? options.photoURL : userClone.photoURL;
    userClone.email = (options.email) ? options.email : userClone.email;

    this._userObserver.next(userClone);
  }

  private cloneCurrentUser(): FirebaseUser {
    return {...this._currentUser};
  }
}
