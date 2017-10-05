import { Observable } from 'rxjs/Observable';
import { AngularFireObject } from 'angularfire2/database';

export class FirebaseObject<T> {
  constructor(private firebaseObject: AngularFireObject<T>) {
  }

  public valueChanges(): Observable<T> {
    return this.firebaseObject.valueChanges();
  }

  public async set(value: T): Promise<void> {
    return await this.firebaseObject.set(value);
  }
  public async update(value: T): Promise<void> {
    return await this.firebaseObject.update(value);
  }
  public async remove(): Promise<void> {
    return await this.firebaseObject.remove();
  }
}
