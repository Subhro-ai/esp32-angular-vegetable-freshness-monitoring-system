import { Component, inject, Input, OnInit } from '@angular/core';
import { Item } from '../models/item';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgIf, NgFor } from '@angular/common';
import { LatestService } from '../services/latest.service';
import { SensorData } from '../models/sensor_data';
import { NgClass } from '@angular/common';
import { ItemService } from '../services/item.service';
@Component({
  selector: 'app-data-card',
  standalone: true,
  providers: [LatestService, ItemService],
  imports: [NgIf, NgFor, HttpClientModule, CommonModule, NgClass],
  templateUrl: './data-card.component.html',
  styleUrl: './data-card.component.css'
})
export class DataCardComponent implements OnInit {
  sensorData: SensorData | null = null;
  items: Item[] = [];
  intervalId: any;
  itemsFetched: boolean = true;
  constructor(private latestService: LatestService,
    private itemService: ItemService
  ) { }



  ngOnInit(): void {
    if (this.fetchItems() == null) {
      console.log("ITEM DONT WORK")
      this.itemsFetched = false;
    }

    // Auto-refresh every 5 seconds
    this.intervalId = setInterval(() => {
      this.fetchLatestData();
    }, 5000);
  }

  
  fetchLatestData(): void {
    this.latestService.getLatest().subscribe({
      next: (data) => {
        this.sensorData = data;
        console.log('Latest Sensor Data:', data);
      },
      error: (error) => {
        console.error('Error fetching sensor data:', error);
      }
    });
  }
  fetchItems(): void {
    this.itemService.getItems().subscribe({
      next: (data) => {
        this.items = data;
        console.log('Stored Items:', data);
      },
      error: (error) => {
        console.error('Error fetching items:', error);
      }
    });
  }

  getFreshnessPercentage(): number {
    return 80; // Placeholder until we integrate ML prediction
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
  calculateHeatIndex(temp: number, humidity: number): number {
    // Simplified formula for Heat Index calculation
    return temp + (0.5 * humidity / 100) * (temp - 10);
  }
}