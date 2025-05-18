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
  minPrice: number | null = null;
  maxPrice: number | null = null;

  @Output() search = new EventEmitter<{
    query: string;
    minPrice: number | null;
    maxPrice: number | null;
  }>();

  onSubmit(event: Event) {
    event.preventDefault();
    this.search.emit({
      query: this.searchText.trim(),
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
    });
  }
}
