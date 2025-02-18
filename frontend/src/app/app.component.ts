import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataCardComponent } from './data-card/data-card.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from "./header/header.component";
import { item } from './models/item';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DataCardComponent, HttpClientModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'roomTemperature';
}
