import { NgIf } from '@angular/common';
import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Toast } from 'bootstrap';
import { Item } from '../models/item';
import { ItemService } from '../services/item.service'; 

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  itemName: string = "";
  itemWeight: number = 0;
  itemDate: string = ""; 

  @ViewChild('toastBootstrap') toastRef!: ElementRef;


  itemService: ItemService = inject(ItemService);


  onSubmit(form: NgForm): void {
    if (form.valid) {
      const newItem: Item = {
        item_name: form.value.itemName,
        weight: form.value.itemAmount,
        date_added: form.value.itemDate 
      };

      this.itemService.addItem(newItem).subscribe({
        next: (response) => {
          console.log('Item added successfully:', response);
          this.showToast();
          form.reset();
        },
        error: (error) => {
          console.error('Error adding item:', error);
        }
      });
    }
  }

  showToast(): void {
    const toast = new Toast(this.toastRef.nativeElement);
    toast.show();
  }
}
