import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Category {
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  private categoriesCollection: AngularFirestoreCollection<Category>;

  title = 'collection';
  categories: Observable<Category[]>;

  constructor(firestore: AngularFirestore) {

    this.categoriesCollection = firestore.collection<Category>('categories');
    this.categories = this.categoriesCollection.valueChanges();
  }


}
