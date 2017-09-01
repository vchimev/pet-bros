import { Observable } from 'rxjs/Observable';
import { FirebaseListObservable } from 'angularfire2/database';

export class FirebaseList<T> extends Observable<T[]> {
  constructor(private firebaseObservable: FirebaseListObservable<T[]>) {
    super(subscriber => {
      const subscription = firebaseObservable.subscribe(item => subscriber.next(item));

      return () => subscription.unsubscribe();
    });
  }

  async set(key: string, value: T): Promise<void> {
    return await this.firebaseObservable.set(key, value);
  }
  async update(key: string, value: T): Promise<void> {
    return await this.firebaseObservable.update(key, value);
  }
  async remove(key?: string): Promise<void> {
    return await this.firebaseObservable.remove(key);
  }
  async push(value: T): Promise<any> {
    return await this.firebaseObservable.push(value);
  }
}
