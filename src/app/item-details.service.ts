import { Injectable } from '@angular/core';
import { item } from './models/item';
@Injectable({
  providedIn: 'root'
})
export class ItemDetailsService {
  itemArray : item[] = [];
  constructor() { }

  getItemArray() : item[] {
    return this.itemArray;
  }

  putItem(data : item) {
    this.itemArray.push(data);
  }

  showDetails() {
    console.log(this.itemArray);
  }
}
