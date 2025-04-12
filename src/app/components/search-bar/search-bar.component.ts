import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule],
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
