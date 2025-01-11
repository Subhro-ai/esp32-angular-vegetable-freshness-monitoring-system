import { Component, Input } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Esp32Service } from '../esp32.service';
import { NgIf } from '@angular/common';
import { item } from '../models/item';
@Component({
  selector: 'app-data-card',
  standalone: true,
  providers: [Esp32Service], 
  imports: [HttpClientModule, NgIf],
  templateUrl: './data-card.component.html',
  styleUrl: './data-card.component.css'
})
export class DataCardComponent {
  temperature: string | undefined;
  humidity: string | undefined;
  heatIndex: string | undefined;
  errorMessage: string | undefined;
  intervalId: any;

  constructor(private esp32Service: Esp32Service) {}


  @Input() newItem : item;

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.esp32Service.getData().subscribe({
        next: (data) => {
          this.temperature = data.temperature;
          this.humidity = data.humidity;
          this.heatIndex = data["Heat Index"];
        },
        error: (error) => {
          this.errorMessage = "Failed to fetch data from ESP32!";
          console.error(error);
        }
      });
    }, 1000);
    
  }
  
}
