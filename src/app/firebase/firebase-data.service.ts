import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';

import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';

import { FirebaseDataServiceCommon } from './firebase.common';
import { FirebaseObject } from './firebase-object';
import { FirebaseList } from './firebase-list';

@Injectable()
export class FirebaseDataService implements FirebaseDataServiceCommon {

  constructor(private af: AngularFireDatabase) {
  }

  public object<T>(path: string): FirebaseObject<T> {
    const firebaseObject: AngularFireObject<T> = this.af.object(path);

    return new FirebaseObject<T>(firebaseObject);
  }

  public list<T>(path): FirebaseList<T> {
    const firebaseList: AngularFireList<T> = this.af.list(path);

    return new FirebaseList<T>(firebaseList);
  }
}
