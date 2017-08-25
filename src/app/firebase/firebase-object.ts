import { Observable } from 'rxjs/Observable';
import { FirebaseObjectObservable } from 'angularfire2/database';

export class FirebaseObject<T> extends Observable<T> {
  constructor(private firebaseObservable: FirebaseObjectObservable<T>) {
    super(subscriber => {
      const subscription = firebaseObservable.subscribe(item => subscriber.next(item));

      return () => subscription.unsubscribe();
    });
  }

  async set(value: T): Promise<void> {
    return await this.firebaseObservable.set(value);
  }
  async update(value: T): Promise<void> {
    return await this.firebaseObservable.update(value);
  }
  async remove(): Promise<void> {
    return await this.firebaseObservable.remove();
  }
}
