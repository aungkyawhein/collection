import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Item } from '../models/item';
import { Category } from '../models/category';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  private itemsCollection: AngularFirestoreCollection<Item>;
  private categoriesCollection: AngularFirestoreCollection<Category>;
  items: Observable<Item[]>;
  categories: Observable<Category[]>;
  categoryFilter$: BehaviorSubject<string|null>;

  constructor(firestore: AngularFirestore) {
    this.categoryFilter$ = new BehaviorSubject(null);
    this.itemsCollection = firestore.collection<Item>('items');
    this.items = this.itemsCollection.valueChanges();
    this.categoriesCollection = firestore.collection<Category>('categories');
    this.categories = this.categoriesCollection.valueChanges();
  }

  ngOnInit(): void {

  }

  filterCategory(category: Category) {
    console.log('catetory', category);
  }

}
