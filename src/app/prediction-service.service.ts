import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface PredictionRequest {
  fruit: string;
  temperature: number;
  humidity: number;
}

export interface PredictionResponse {
  days_to_spoil: number;
}

@Injectable({
  providedIn: 'root'
})
export class PredictionServiceService {
  private apiUrl = 'http://127.0.0.1:8000/predict'; // Backend API URL

  constructor(private http: HttpClient) {}
  
  prediction: PredictionResponse | null = null;
  // Function to make a POST request to the prediction API
  getPrediction(data: PredictionRequest): Observable<PredictionResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<PredictionResponse>(this.apiUrl, data, { headers });
  }
}
