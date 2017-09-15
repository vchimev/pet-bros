import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';

import firebase = require('nativescript-plugin-firebase');

export class FirebaseObject<T> extends Observable<T> {
  constructor(private observable: Observable<T>, private path: string) {
    super(subscriber => {
      const subscription = observable.subscribe(subscriber);

      return () => subscription.unsubscribe();
    });
  }

  public set(value: T): Promise<void> {
    return firebase.setValue(this.path, value);
  }
  public update(value: T): Promise<void> {
    return firebase.update(this.path, value);
  }
  public remove(): Promise<void> {
    return firebase.remove(this.path);
  }
}
