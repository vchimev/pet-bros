import { Injectable } from '@angular/core';
import { FirebaseUser, FirebaseUserService, FirebaseUserUpdateOptions, FirebaseDataService } from './firebase';

import { Observable } from 'rxjs/Observable';
import { User, PetBasic } from './models';
import { Pet, Shelter } from 'petfinder-angular-service';
import { FirebaseList } from './firebase/firebase-list';
import { assets } from './common/utils/defaults';

@Injectable()
export class UserService {
  private _currentUser: User = null;

  constructor(private firebaseUserService: FirebaseUserService, private firebaseDataService: FirebaseDataService) { }

  get user$(): Observable<User> {
    return this.firebaseUserService.user$
    .map(firebaseUser => {
      if (firebaseUser) {
        this._currentUser = {
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName,
          email: firebaseUser.email,
          defaultSearchLocation: '',
          favouritePets: this.firebaseDataService.list(`/users/${firebaseUser.uid}/pets`),
          favouriteShelters: this.firebaseDataService.list(`/users/${firebaseUser.uid}/shelters`)
        };
      } else {
        this._currentUser = null;
      }

      return this._currentUser;
    });
  }

  get favouritePets$(): FirebaseList<PetBasic> {
    return this._currentUser.favouritePets;
  }

  get favouriteShelters$() {
    return this._currentUser.favouriteShelters;
  }

  signIn(email: string, password: string): Promise<FirebaseUser> {
    return this.firebaseUserService.signIn(email, password);
  }

  async register(email: string, password: string, displayName: string, defaultSearchLocation: string): Promise<string> {
    const key = await this.firebaseUserService.register(email, password);

    this.firebaseUserService.updateUserDetails({
      displayName: displayName
    });

    return key;
  }

  logout(): Promise<any> {
    return this.firebaseUserService.logout();
  }

  resetPassword(email: string): Promise<any> {
    return this.firebaseUserService.resetPassword(email);
  }

  updateUserDetails(options: FirebaseUserUpdateOptions) {
    return this.firebaseUserService.updateUserDetails(options);
  }

  isLoggedIn() {
    return (this._currentUser) ? true : false;
  }

  addPetToFavourites(pet: Pet) {
    if (this.isLoggedIn()) {
        this.favouritePets$.update(pet.id, {
          id: pet.id,
          name: pet.name,
          img: pet.media.getFirstImage(3, assets + '/images/generic-pet.jpg')
        });
    }
  }
  removePetFromFavourites(key: string) {
    if (this.isLoggedIn()) {
      this.favouritePets$.remove(key);
    }
  }

  addShelterToFavourites(shelter: Shelter) {
    if (this.isLoggedIn()) {
      // this.favouriteShelters$.push(shelter);
      this.favouriteShelters$.update(shelter.id, {
        id: shelter.id,
        name: shelter.name,
        phone: shelter.phone,
        email: shelter.email,
      });
    }
  }
  removeShelterFromFavourites(key: string) {
    if (this.isLoggedIn()) {
      this.favouriteShelters$.remove(key);
    }
  }

}
