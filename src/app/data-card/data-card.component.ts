import { Component, inject, Input } from '@angular/core';
// import { HttpClientModule } from '@angular/common/http';
import { HttpClientModule, provideHttpClient } from '@angular/common/http'; 
import { Esp32Service } from '../esp32.service';
import { NgIf, NgFor } from '@angular/common';
import { item } from '../models/item';
import { PredictionRequest,PredictionResponse, PredictionServiceService } from '../prediction-service.service';
import { ItemDetailsService } from '../item-details.service';
@Component({
  selector: 'app-data-card',
  standalone: true,
  providers: [Esp32Service, PredictionServiceService], 
  imports: [ NgIf, NgFor, HttpClientModule],
  templateUrl: './data-card.component.html',
  styleUrl: './data-card.component.css'
})
export class DataCardComponent {
  temperature: string | undefined;
  humidity: string | undefined;
  heatIndex: string | undefined;
  errorMessage: string | undefined;
  intervalId: any;
  itemArray :item[] = [];
  itemService : ItemDetailsService = inject(ItemDetailsService);
  // predictionService : PredictionServiceService = inject(PredictionServiceService);
  
  constructor(private esp32Service: Esp32Service, 
    private predictionService: PredictionServiceService
    ) {
    this.itemArray = this.itemService.getItemArray();
  }

  inputData: PredictionRequest = {
    fruit: '',
    temperature: 0,
    humidity: 0,
  };


  prediction: PredictionResponse | null = null;

  

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.esp32Service.getData().subscribe({
        next: (data) => {
          this.temperature = data.temperature;
          this.humidity = data.humidity;
          this.heatIndex = data["Heat Index"];
          // this.inputData = {this.itemArray[0].name,this.humidity,this.temperature}
        },
      });
    }, 1000);
  }

  getPrediction(): void {
    console.log(this.itemArray[0].name, Number(this.humidity), Number(this.temperature));
    if (!this.itemArray.length || !this.humidity || !this.temperature) {
      this.errorMessage = 'Missing required data for prediction.';
      return;
    }
    this.predictionService.getPrediction({
      fruit: this.itemArray[0].name,
      humidity: Number(this.humidity),
      temperature: Number(this.temperature)
    }).subscribe({
      next: (response) => {
        this.prediction = response;
        this.errorMessage = undefined; // Clear any previous error messages
      },
      error: (error) => {
        console.error('Error fetching prediction:', error);
        this.errorMessage = 'Failed to fetch prediction.';
      }
    });
  }
  }
