import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.sass']
})
export class AddCategoryComponent implements OnInit {
  private categoriesCollection: AngularFirestoreCollection<Category>;
  categories: Observable<Category[]>;
  category: Category = {
    name: ''
  };
  name = new FormControl('', [Validators.required]);

  constructor(firestore: AngularFirestore) {
    this.categoriesCollection = firestore.collection<Category>('categories');
    this.categories = this.categoriesCollection.valueChanges();
  }

  ngOnInit(): void {
  }

  addCategory(e) {
    this.categoriesCollection.add(this.category);
    this.category = {
      name: ''
    };
  }

  getErrorMessage() {
    return 'Error message';
  }

}
