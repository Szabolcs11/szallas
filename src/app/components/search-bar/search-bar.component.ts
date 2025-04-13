import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDivider } from '@angular/material/list';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule, MatDivider, MatTooltip],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
  searchText: string = '';

  @Output() search = new EventEmitter<string>();

  onSubmit(event: Event) {
    console.log('Form submitted:', this.searchText);

    event.preventDefault();
    this.search.emit(this.searchText.trim().toLowerCase());
  }
}
