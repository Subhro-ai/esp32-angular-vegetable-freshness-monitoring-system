import { Injectable } from '@angular/core';
import { SensorData } from '../models/sensor_data';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LatestService {

  private latestUrl = 'http://localhost:8000/esp32/latest';
  constructor(private http : HttpClient) { }

  getLatest() : Observable<SensorData>{
    return this.http.get<SensorData>(this.latestUrl)
  }
}
