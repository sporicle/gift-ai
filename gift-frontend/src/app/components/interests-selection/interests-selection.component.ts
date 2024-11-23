import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GiftSelectionService } from '../../services/gift-selection.service';
import { SelectionSummaryComponent } from '../shared/selection-summary/selection-summary.component';
import { AnimationService } from '../../services/animation.service';
import { StartOverComponent } from '../shared/start-over/start-over.component';

type PredefinedInterest = 'sports' | 'cooking' | 'beauty' | 'tech' | 'outdoors' | 'art' | 'fitness' | 'travel';

@Component({
  selector: 'app-interests-selection',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SelectionSummaryComponent, StartOverComponent],
  templateUrl: './interests-selection.component.html',
  styleUrls: ['./interests-selection.component.scss']
})
export class InterestsSelectionComponent {
  interestsForm: FormGroup;
  predefinedInterests: PredefinedInterest[] = ['sports', 'cooking', 'beauty', 'tech', 'outdoors', 'art', 'fitness', 'travel'];
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private giftSelectionService: GiftSelectionService,
    private animationService: AnimationService
  ) {
    this.interestsForm = this.fb.group({
      selectedInterests: [[]],
      customInterests: this.fb.array([])
    });
  }

  get customInterests() {
    return this.interestsForm.get('customInterests') as FormArray;
  }

  addCustomInterest() {
    this.customInterests.push(this.fb.control(''));
  }

  removeCustomInterest(index: number) {
    this.customInterests.removeAt(index);
  }

  toggleInterest(interest: string) {
    const currentInterests = this.interestsForm.get('selectedInterests')?.value || [];
    const index = currentInterests.indexOf(interest);
    
    if (index === -1) {
      currentInterests.push(interest);
    } else {
      currentInterests.splice(index, 1);
    }
    
    this.interestsForm.get('selectedInterests')?.setValue(currentInterests);
  }

  isSelected(interest: string): boolean {
    return this.interestsForm.get('selectedInterests')?.value?.includes(interest) || false;
  }

  onNext(): void {
    if (this.interestsForm.valid) {
      const selectedInterests = this.interestsForm.get('selectedInterests')?.value || [];
      const customInterests = this.customInterests.value.filter((interest: string) => interest.trim());
      
      const allInterests = [...selectedInterests, ...customInterests];
      
      if (allInterests.length > 0) {
        this.giftSelectionService.updateCriteria({
          interests: allInterests
        });
        this.animationService.triggerPageTransition();
        setTimeout(() => {
          this.router.navigate(['/price-selection']);
        }, 250);
      }
    }
  }

  onSkip(): void {
    this.animationService.triggerPageTransition();
    setTimeout(() => {
      this.router.navigate(['/price-selection']);
    }, 250);
  }
} 