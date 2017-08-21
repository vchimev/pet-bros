import { Injectable } from '@angular/core';
import { User } from './models';

@Injectable()
export class UserService {

  constructor() { }

  login(email: string, password: string): Promise<User> {
    const sampleUser: User = {
      email: email,
      name: 'some name',
      defaultSearchLocation: 'Boston, Ma',
      favouritePets: [],
      favouriteShelters: []
    };

    return Promise.resolve(sampleUser);
  }

  register(email: string, password: string): Promise<User> {
    const sampleUser: User = {
      email: email,
      name: 'some name',
      defaultSearchLocation: 'Boston, Ma',
      favouritePets: [],
      favouriteShelters: []
    };

    return Promise.resolve(sampleUser);
  }

  resetPassword(email: string): Promise<any> {
    return Promise.resolve();
  }
}
