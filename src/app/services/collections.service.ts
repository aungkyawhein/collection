import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { from, Observable, of, BehaviorSubject, combineLatest } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
import { convertSnaps } from './utils';

import { Item } from '../models/item';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CollectionsService {

  constructor(private firestore: AngularFirestore) { }

  loadAllItems(): Observable<Item[]> {
    return this.firestore.collection(
      'items',
      ref => ref.orderBy('name')
    ).snapshotChanges()
    .pipe(
      map(snaps => convertSnaps<Item>(snaps)),
      first()
    );
  }
}
