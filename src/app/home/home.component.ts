import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CollectionsService } from '../services/collections.service';

import { Item } from '../models/item';
import { Category } from '../models/category';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  private categoriesCollection: AngularFirestoreCollection<Category>;
  items: Observable<Item[]>;
  filteredItems: Observable<Item[]>;
  categories: Observable<Category[]>;

  constructor(firestore: AngularFirestore, private collectionService: CollectionsService) {
    this.categoriesCollection = firestore.collection<Category>('categories');
    this.categories = this.categoriesCollection.valueChanges();
  }

  ngOnInit(): void {
    this.items = this.collectionService.loadAllItems();
    this.filteredItems = this.getFilteredItems(null);
  }

  getFilteredItems(category: Category) {
    return this.items.pipe(
      map(items => {
        if (category) {
          return items.filter(
            item => item.category === category.name
          );
        }
        return items;
      })
    );
  }

  filterCategory(category: Category) {
    this.filteredItems = this.getFilteredItems(category);
  }

}
