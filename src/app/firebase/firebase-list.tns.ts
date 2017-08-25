import { Observable } from 'rxjs/Observable';
import firebase = require('nativescript-plugin-firebase');

export class FirebaseList<T> extends Observable<T> {
  constructor(private observable: Observable<T>, private path: string) {
    super(subscriber => {
      const subscription = observable.subscribe(item => subscriber.next(item));

      return () => subscription.unsubscribe();
    });
  }

  public set(key: string, value: T): Promise<void> {
    return firebase.setValue(`${this.path}/${key}`, value);
  }
  public update(key: string, value: T): Promise<void> {
    return firebase.update(`${this.path}/${key}`, value);
  }
  public remove(key?: string): Promise<void> {
    return firebase.remove(`${this.path}/${key}`);
  }
  public push(value: T): Promise<any> {
    return firebase.push(this.path, value);
  }

}
