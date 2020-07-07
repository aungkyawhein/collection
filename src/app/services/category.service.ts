import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { from, Observable, of, BehaviorSubject, combineLatest } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
import { convertSnaps } from './utils';

import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private firestore: AngularFirestore) { }

  loadAllItems(): Observable<Category[]> {
    return this.firestore.collection<Category>('categories').valueChanges();
  }
}
