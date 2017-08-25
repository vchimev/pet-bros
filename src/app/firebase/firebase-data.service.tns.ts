import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';

import firebase = require('nativescript-plugin-firebase');

import { FirebaseDataServiceCommon } from './firebase.common';
import { FirebaseObject } from './firebase-object';
import { FirebaseList } from './firebase-list';

@Injectable()
export class FirebaseDataService implements FirebaseDataServiceCommon {

  constructor(private ngZone: NgZone) {
  }

  public object<T>(path: string): FirebaseObject<T> {
    const observable = this.prepareObjectObservable<T>(path).share();

    return new FirebaseObject(observable, path);
  }

  private prepareObjectObservable<T>(path: string): Observable<T> {
    return new Observable<T>(subscriber => {
      let eventListeners: any[];

      firebase.addValueEventListener(data => {
        this.ngZone.run(() => {
          subscriber.next(data.value);
        });
      }, path)
      .then(listenerWrapper => eventListeners = listenerWrapper.listeners);

      return () => firebase.removeEventListeners(eventListeners, path);
    });
  }

  public list<T>(path: string): FirebaseList<T> {
    const observable: Observable<T> = this.prepareListObservable(path);

    return new FirebaseList(observable, path);
  }

  private prepareListObservable<T>(path: string): Observable<T> {
    return new Observable<T>(subscriber => {
      let eventListeners: any[];

      firebase.addChildEventListener(data => {
        this.ngZone.run(() => {
          subscriber.next(data.value);
        });
      }, path)
      .then(listenerWrapper => eventListeners = listenerWrapper.listeners);

      return () => firebase.removeEventListeners(eventListeners, path);
    });
  }

}
