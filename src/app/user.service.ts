import { Injectable } from '@angular/core';
import { FirebaseUser, FirebaseUserService, FirebaseUserUpdateOptions, FirebaseDataService } from './firebase';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/switchMap';

import { PetBasic } from './models';
import { Pet, Shelter } from 'petfinder-angular-service';
import { FirebaseList } from './firebase/firebase-list';
import { assets } from './common/utils/defaults';

@Injectable()
export class UserService {
  private _currentUser: FirebaseUser = null;
  private _favouritePets: FirebaseList<PetBasic>;
  private _favouriteShelters: FirebaseList<any>;

  public get user$(): Observable<FirebaseUser> {
    return this.firebaseUserService.user$;
  }

  /**
   * Returns a long lived Observable, which returns pets for currently logged in user
   * It will automatically switch to a new user when new user loggs in
   */
  public get favouritePets$(): Observable<PetBasic[]> {
    return this.user$.switchMap(user => {
      if (user) {
        return this.firebaseDataService.list<PetBasic>(`/users/${user.uid}/pets`);
      } else {
        // fallback
        return new BehaviorSubject([]);
      }
    });
  }

  /**
   * Returns a long lived Observable, which returns shelters for currently logged in user
   * It will automatically switch to a new user when new user loggs in
   */
  public get favouriteShelters$(): Observable<any[]> {
    return this.user$.switchMap(user => {
      if (user) {
        return this.firebaseDataService.list<any>(`/users/${user.uid}/shelters`);
      } else {
        return new BehaviorSubject([]);
      }
    });
  }

  constructor(private firebaseUserService: FirebaseUserService, private firebaseDataService: FirebaseDataService) {
    this.user$.subscribe(firebaseUser => this.onUserUpdate(firebaseUser));
  }

  private onUserUpdate(firebaseUser: FirebaseUser) {
    this._currentUser = firebaseUser;
    if (firebaseUser) {
      this._favouritePets = this.firebaseDataService.list(`/users/${firebaseUser.uid}/pets`);
      this._favouriteShelters = this.firebaseDataService.list(`/users/${firebaseUser.uid}/shelters`);
    } else {
      this._favouritePets = null;
      this._favouriteShelters = null;
    }
  }

  public signIn(email: string, password: string): Promise<FirebaseUser> {
    return this.firebaseUserService.signIn(email, password);
  }

  public async register(email: string, password: string, displayName: string): Promise<string> {
    const key = await this.firebaseUserService.register(email, password);

    this.firebaseUserService.updateUserDetails({
      displayName: displayName
    });

    return key;
  }

  public logout(): Promise<any> {
    return this.firebaseUserService.logout();
  }

  public resetPassword(email: string): Promise<any> {
    return this.firebaseUserService.resetPassword(email);
  }

  public updateUserDetails(options: FirebaseUserUpdateOptions) {
    return this.firebaseUserService.updateUserDetails(options);
  }

  public isLoggedIn() {
    return (this._currentUser) ? true : false;
  }

  public addPetToFavourites(pet: Pet) {
    if (this.isLoggedIn()) {
        this._favouritePets.update(pet.id, {
          id: pet.id,
          name: pet.name,
          img: pet.media.getFirstImage(3, assets + '/images/generic-pet.jpg')
        });
    }
  }
  public removePetFromFavourites(key: string) {
    if (this.isLoggedIn()) {
      this._favouritePets.remove(key);
    }
  }

  public addShelterToFavourites(shelter: Shelter) {
    if (this.isLoggedIn()) {
      this._favouriteShelters.update(shelter.id, {
        id: shelter.id,
        name: shelter.name,
        phone: shelter.phone,
        email: shelter.email,
      });
    }
  }
  public removeShelterFromFavourites(key: string) {
    if (this.isLoggedIn()) {
      this._favouriteShelters.remove(key);
    }
  }
}
