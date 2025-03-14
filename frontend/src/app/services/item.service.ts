import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../models/item';
@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = 'http://localhost:8000/items';

  constructor(private http : HttpClient) { }

  addItem(itemData: Item): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/store-item`, itemData);
  }

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.apiUrl}/get-items`);
  }
}
