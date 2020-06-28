import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Item } from '../models/item';
import { Category } from '../models/category';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Array<Item> = [];

  constructor() { }

  ngOnInit(): void {
    let i = 10;
    while (i > 0) {
      this.items.push({
        name: 'Item ' + i,
        url: '#',
        category: 'test'
      });
      i--;
    }
  }

}
