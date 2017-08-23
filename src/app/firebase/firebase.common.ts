import { User } from './user.model';

export interface FirebaseCommon {
  signIn(email: string, password: string): Promise<User>;

  register(email: string, password: string, displayName: string): Promise<User>;

  logout(): Promise<any>;

  resetPassword(email: string): Promise<any>;
}
