import { Observable } from 'rxjs/Observable';
import { AngularFireList } from 'angularfire2/database';

export class FirebaseList<T> {
  constructor(private firebaseList: AngularFireList<T>) {
  }

  public valueChanges(): Observable<T[]> {
    return this.firebaseList.valueChanges();
  }

  public async set(key: string, value: T): Promise<void> {
    return await this.firebaseList.set(key, value);
  }
  public async update(key: string, value: T): Promise<void> {
    return await this.firebaseList.update(key, value);
  }
  public async remove(key?: string): Promise<void> {
    return await this.firebaseList.remove(key);
  }
  public async push(value: T): Promise<any> {
    return await this.firebaseList.push(value);
  }
}
