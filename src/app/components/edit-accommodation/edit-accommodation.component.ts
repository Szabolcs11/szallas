import { Component, Inject, Input } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { Accommodation } from '../../models/accommodation';
import { CommonModule } from '@angular/common';
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-edit-accommodation',
  templateUrl: './edit-accommodation.component.html',
  styleUrls: ['./edit-accommodation.component.css'],
  imports: [
    MatDialogActions,
    CommonModule,
    MatLabel,
    MatFormField,
    MatDialogContent,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
  ],
})
export class EditAccommodationComponent {
  accommodation: Accommodation;

  constructor(
    public dialogRef: MatDialogRef<EditAccommodationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Accommodation
  ) {
    this.accommodation = { ...data };
  }
  @Input() editMode: boolean = false;

  onSave(): void {
    this.dialogRef.close(this.accommodation);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
