/**
 * Use reactive form for this add item component
 */

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Item } from '../models/item';
import { Category } from '../models/category';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.sass']
})
export class AddItemComponent implements OnInit {

  private itemsCollection: AngularFirestoreCollection<Item>;
  private categoriesCollection: AngularFirestoreCollection<Category>;
  categories: Observable<Category[]>;

  urlReg = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

  name = new FormControl('', [Validators.required]);
  url = new FormControl('', [Validators.required, Validators.pattern(this.urlReg)]);
  category = new FormControl('', [Validators.required]);
  addItemForm: any;

  constructor(firestore: AngularFirestore, fb: FormBuilder) {
    this.itemsCollection = firestore.collection<Item>('items');
    this.categoriesCollection = firestore.collection<Category>('categories');
    this.categories = this.categoriesCollection.valueChanges();

    this.addItemForm = fb.group({
      name: this.name,
      url: this.url,
      category: this.category
    });
  }

  ngOnInit(): void {
  }

  addItem(e) {
    this.itemsCollection.add(this.addItemForm.value);
  }

  getErrorMessage() {
    return 'Error message';
  }

}
