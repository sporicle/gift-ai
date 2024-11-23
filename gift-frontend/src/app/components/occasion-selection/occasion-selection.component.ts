import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GiftSelectionService } from '../../services/gift-selection.service';
import { SelectionSummaryComponent } from '../shared/selection-summary/selection-summary.component';
import { AnimationService } from '../../services/animation.service';

type Occasion = 'birthday' | 'anniversary' | 'wedding' | 'christmas' | 'valentines' | 'other';

@Component({
  selector: 'app-occasion-selection',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SelectionSummaryComponent],
  templateUrl: './occasion-selection.component.html',
  styleUrls: ['./occasion-selection.component.scss']
})
export class OccasionSelectionComponent {
  selectedOccasion: Occasion | null = null;
  occasionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private giftSelectionService: GiftSelectionService,
    private animationService: AnimationService
  ) {
    this.occasionForm = this.fb.group({
      otherOccasion: ['']
    });
  }

  selectOccasion(occasion: Occasion): void {
    this.selectedOccasion = occasion;
    if (occasion !== 'other') {
      this.occasionForm.get('otherOccasion')?.setValue('');
    }
  }

  onNext(): void {
    const occasion = this.selectedOccasion === 'other'
      ? this.occasionForm.get('otherOccasion')?.value
      : this.selectedOccasion;

    if (occasion) {
      this.giftSelectionService.updateCriteria({
        occasion: occasion
      });
      this.animationService.triggerPageTransition();
      setTimeout(() => {
        this.router.navigate(['/relationship-selection']);
      }, 250);
    }
  }

  onSkip(): void {
    this.animationService.triggerPageTransition();
    setTimeout(() => {
      this.router.navigate(['/relationship-selection']);
    }, 250);
  }
}
