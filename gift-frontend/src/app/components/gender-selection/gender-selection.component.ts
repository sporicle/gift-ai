import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GiftSelectionService } from '../../services/gift-selection.service';

type Gender = 'male' | 'female';

@Component({
  selector: 'app-gender-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gender-selection.component.html',
  styleUrls: ['./gender-selection.component.scss']
})
export class GenderSelectionComponent {
  selectedGender: Gender | null = null;

  constructor(
    private router: Router,
    private giftSelectionService: GiftSelectionService
  ) {}

  selectGender(gender: Gender): void {
    this.selectedGender = gender;
  }

  onNext(): void {
    if (this.selectedGender) {
      this.giftSelectionService.updateCriteria({ gender: this.selectedGender });
      this.router.navigate(['/age-selection']);
    }
  }
} 