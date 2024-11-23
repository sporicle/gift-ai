import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GiftSelectionService } from '../../services/gift-selection.service';
import { SelectionSummaryComponent } from '../shared/selection-summary/selection-summary.component';
import { AnimationService } from '../../services/animation.service';
import { StartOverComponent } from '../shared/start-over/start-over.component';

type Gender = 'male' | 'female';

@Component({
  selector: 'app-gender-selection',
  standalone: true,
  imports: [
    CommonModule, 
    SelectionSummaryComponent,
    StartOverComponent
  ],
  templateUrl: './gender-selection.component.html',
  styleUrls: ['./gender-selection.component.scss']
})
export class GenderSelectionComponent {
  selectedGender: Gender | null = null;

  constructor(
    private router: Router,
    private giftSelectionService: GiftSelectionService,
    private animationService: AnimationService
  ) {}

  selectGender(gender: Gender): void {
    this.selectedGender = gender;
  }

  onNext(): void {
    if (this.selectedGender) {
      this.giftSelectionService.updateCriteria({ gender: this.selectedGender });
      this.animationService.triggerPageTransition();
      setTimeout(() => {
        this.router.navigate(['/age-selection']);
      }, 250);
    }
  }

  onSkip(): void {
    this.animationService.triggerPageTransition();
    setTimeout(() => {
      this.router.navigate(['/age-selection']);
    }, 250);
  }
} 