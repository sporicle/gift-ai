import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

type Gender = 'male' | 'female';

@Component({
  selector: 'app-gender-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gender-selection.component.html',
  styleUrls: ['./gender-selection.component.scss']
})
export class GenderSelectionComponent {
  @Output() genderSelected = new EventEmitter<Gender>();
  
  selectedGender: Gender | null = null;

  selectGender(gender: Gender): void {
    this.selectedGender = gender;
  }

  onNext(): void {
    if (this.selectedGender) {
      this.genderSelected.emit(this.selectedGender);
    }
  }
} 