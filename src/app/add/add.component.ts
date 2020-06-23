import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Item {
  name: string;
  url: string;
  category: string;
}

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.sass']
})
export class AddComponent implements OnInit {
  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  item: Item = {
    name : '',
    url: '',
    category: ''
  };

  constructor(firestore: AngularFirestore) {
    this.itemsCollection = firestore.collection<Item>('items');
    this.items = this.itemsCollection.valueChanges();
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

}
