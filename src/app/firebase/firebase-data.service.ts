import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';

import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

import { FirebaseDataServiceCommon } from './firebase.common';
import { FirebaseObject } from './firebase-object';
import { FirebaseList } from './firebase-list';

@Injectable()
export class FirebaseDataService implements FirebaseDataServiceCommon {

  constructor(private af: AngularFireDatabase) {
  }

  object<T>(path: string): FirebaseObject<T> {
    const firebaseObject = this.af.object(path);

    return new FirebaseObject(firebaseObject);
  }

  list<T>(path): FirebaseList<T[]> {
    const firebaseList = this.af.list(path);

    return new FirebaseList(firebaseList);
  }
}
