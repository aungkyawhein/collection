import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Item } from '../models/item';
import { Category } from '../models/category';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.sass']
})
export class AddComponent implements OnInit {
  private itemsCollection: AngularFirestoreCollection<Item>;
  private categoriesCollection: AngularFirestoreCollection<Category>;
  items: Observable<Item[]>;
  item: Item = {
    name : '',
    url: '',
    category: ''
  };
  categories: Observable<Category[]>;
  category: Category = {
    name: ''
  };

  constructor(firestore: AngularFirestore) {
    this.itemsCollection = firestore.collection<Item>('items');
    this.items = this.itemsCollection.valueChanges();
    this.categoriesCollection = firestore.collection<Category>('categories');
    this.categories = this.categoriesCollection.valueChanges();
  }

  ngOnInit(): void {
  }

  addItem(e) {
    this.itemsCollection.add(this.item);
    this.item = {
      name : '',
      url: '',
      category: ''
    };
  }

  addCategory(e) {
    this.categoriesCollection.add(this.category);
    this.category = {
      name: ''
    };
  }

}
