import { NgIf } from '@angular/common';
import { Component, ElementRef, inject, Output, ViewChild } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { item } from '../models/item';
import { EventEmitter } from '@angular/core';
import { Toast } from 'bootstrap';
import { Inject } from '@angular/core';
import { ItemDetailsService } from '../item-details.service';
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
  // @Output() sendDataEvent = new EventEmitter<item>();
  @ViewChild('toastBootstrap') toastRef!: ElementRef;

  itemDetailService : ItemDetailsService = inject(ItemDetailsService);

  onSubmit(form:any) : void {
    const toast = new Toast(this.toastRef.nativeElement);
    toast.show();
    this.itemName = form.itemName;
    this.itemDate = form.itemDate;
    this.itemWeight = form.itemAmount;
    this.newItem= {name : this.itemName, weight : this.itemWeight, date : this.itemDate};
    // this.sendDataEvent.emit(this.newItem);
    this.itemDetailService.putItem(this.newItem);
  }

  showDetail() : void {
    this.itemDetailService.showDetails();
  }
}
