import { NgIf } from '@angular/common';
import { Component, Output } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { item } from '../models/item';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  itemName : string= "";
  itemWeight : number= 0;
  itemDate : any= null;
  newItem : any;
  @Output() sendDataEvent = new EventEmitter<item>();

  onSubmit(form:any) : void {
    this.itemName = form.itemName;
    this.itemDate = form.itemDate;
    this.itemWeight = form.itemWeight;
    this.newItem= {name : this.itemName, weight : this.itemWeight, date : this.itemDate};
    this.sendDataEvent.emit(this.newItem);
  }
}
