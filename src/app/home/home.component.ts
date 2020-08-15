import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CollectionsService } from '../services/collections.service';
import { CategoryService } from '../services/category.service';

import { Item } from '../models/item';
import { Category } from '../models/category';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  items: Observable<Item[]>;
  filteredItems: Observable<Item[]>;
  categories: Observable<Category[]>;
  loading = true;
  emptyCategory = false;
  filteredCategory = '';

  constructor(
    private collectionService: CollectionsService,
    private categoryService: CategoryService
  ) {

  }

  ngOnInit(): void {
    this.items = this.collectionService.loadAllItems();
    this.filteredItems = this.getFilteredItems(null);

    this.categories = this.categoryService.loadAllItems();
  }

  getFilteredItems(category: Category) {
    this.filteredCategory = category ? category.name : '';
    return this.items.pipe(
      map(items => {
        this.loading = false;
        if (category) {
          const returnItems = items.filter(
            item => item.category === category.name
          );
          if (!returnItems.length) {
            this.emptyCategory = true;
          }
          return returnItems;
        }
        return items;
      })
    );
  }

  filterCategory(category: Category) {
    this.loading = true;
    this.emptyCategory = false;
    this.filteredItems = this.getFilteredItems(category);
  }

  selectCategory(categoryName: string) {
    this.filterCategory({
      name: categoryName
    });
  }

}
