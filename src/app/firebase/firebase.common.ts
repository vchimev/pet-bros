import { FirebaseUser } from './firebase-user.model';

export interface FirebaseUserServiceCommon {
  signIn(email: string, password: string): Promise<FirebaseUser>;

  register(email: string, password: string): Promise<string>;

  logout(): Promise<any>;

  resetPassword(email: string): Promise<any>;

  updateUserDetails(displayName): Promise<any>;
}

// export interface FirebaseDataServiceCommon {

// }
