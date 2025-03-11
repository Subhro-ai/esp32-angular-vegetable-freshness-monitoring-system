import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SensorData } from '../models/sensor_data';
@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private historyUrl = 'http://localhost:8000/esp32/history';
  constructor(private http: HttpClient) { }

  getHistory(from?: string, to?: string): Observable<SensorData[]> {
    let params = new HttpParams();
    

    if (from) params = params.append('from', from);
    if (to) params = params.append('to', to);

    return this.http.get<SensorData[]>(this.historyUrl, { params });
  }
}
