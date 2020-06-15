import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Item {
  name: string;
  url: string;
  category: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  item: Item = {
    name : '',
    url: '',
    category: ''
  };
  title = 'collection';
  categories: Array<any> = [];

  constructor(firestore: AngularFirestore) {
    this.itemsCollection = firestore.collection<Item>('items');
    this.items = this.itemsCollection.valueChanges();
  }

  addItem(e) {
    this.itemsCollection.add(this.item);
    this.item = {
      name : '',
      url: '',
      category: ''
    };
  }
}
