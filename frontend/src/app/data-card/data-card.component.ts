import { Component, inject, Input, OnInit  } from '@angular/core';
// import { HttpClientModule } from '@angular/common/http';
import { HttpClientModule, provideHttpClient } from '@angular/common/http'; 
import { NgIf, NgFor } from '@angular/common';
import { HistoryService } from '../services/history.service';
import { SensorData } from '../models/sensor_data';
@Component({
  selector: 'app-data-card',
  standalone: true,
  providers: [HistoryService], 
  imports: [ NgIf, NgFor, HttpClientModule],
  templateUrl: './data-card.component.html',
  styleUrl: './data-card.component.css'
})
export class DataCardComponent implements OnInit{
  sensorData: SensorData[] = [];

  constructor(private historyService: HistoryService) {}

  ngOnInit(): void {

    this.historyService.getHistory().subscribe({
      next: (data) => {
        this.sensorData = data;
        console.log('Received data:', data);
      },
      error: (error) => {
        console.error('Error fetching history:', error);
      }
    });
  }
  
  }
