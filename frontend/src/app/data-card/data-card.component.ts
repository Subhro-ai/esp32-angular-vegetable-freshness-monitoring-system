import { Component, inject, Input, OnInit } from '@angular/core';
// import { HttpClientModule } from '@angular/common/http';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { NgIf, NgFor } from '@angular/common';
import { LatestService } from '../services/latest.service';
import { SensorData } from '../models/sensor_data';
@Component({
  selector: 'app-data-card',
  standalone: true,
  providers: [LatestService],
  imports: [NgIf, NgFor, HttpClientModule],
  templateUrl: './data-card.component.html',
  styleUrl: './data-card.component.css'
})
export class DataCardComponent implements OnInit {
  sensorData: SensorData | null = null;
  intervalId: any;
  constructor(private latestService: LatestService) { }

  ngOnInit(): void {
    this.fetchLatestData();

    this.intervalId = setInterval(() => {
      this.fetchLatestData();
    }, 5000)
  }
  fetchLatestData(): void {
    this.latestService.getLatest().subscribe({
      next: (data) => {
        this.sensorData = data;
        console.log('Latest Data:', data);
      },
      error: (error) => {
        console.error('Error fetching latest data:', error);
      }
    });
  }
  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
