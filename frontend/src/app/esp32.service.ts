// esp32.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Esp32Service {

  private apiUrl = 'http://192.168.1.29/data'; // Replace with your ESP32 IP address

  constructor(private http: HttpClient) {}

  // Method to get data from ESP32
  
  getData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
