import { FirebaseUser } from './firebase-user.model';
import { Observable } from 'rxjs/Observable';
import { FirebaseObject } from './firebase-object';

export interface FirebaseUserServiceCommon {
  signIn(email: string, password: string): Promise<FirebaseUser>;

  register(email: string, password: string): Promise<string>;

  logout(): Promise<any>;

  resetPassword(email: string): Promise<any>;

  updateUserDetails(displayName): Promise<any>;
}

export interface FirebaseDataServiceCommon {
  object(path: string): FirebaseObject<any>;
}
