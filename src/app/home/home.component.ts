import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  items: Array<number> = [];

  constructor() { }

  ngOnInit(): void {
    let i = 10;
    while (i > 0) {
      this.items.push(i);
      i--;
    }
  }

}
