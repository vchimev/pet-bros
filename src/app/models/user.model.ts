import { FirebaseUser } from '../firebase';
import { Observable } from 'rxjs/Observable';
import { FirebaseList } from '../firebase/firebase-list';
import { Pet, Shelter } from 'petfinder-angular-service';
import { PetBasic } from '../models';

export class User {
  uid: string;
  displayName: string;
  email: string;
  defaultSearchLocation: string;
  // favouritePets: FirebaseList<Pet>;
  // favouriteShelters: FirebaseList<Shelter>;
  favouritePets: FirebaseList<PetBasic>;
  favouriteShelters: FirebaseList<any>;
};
