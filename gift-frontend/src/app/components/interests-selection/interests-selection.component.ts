import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GiftSelectionService } from '../../services/gift-selection.service';
import { AnimationService } from '../../services/animation.service';
import { StartOverComponent } from '../shared/start-over/start-over.component';
import { GiftApiService, Interest } from '../../services/gift-api.service';

@Component({
  selector: 'app-interests-selection',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, StartOverComponent],
  templateUrl: './interests-selection.component.html',
  styleUrls: ['./interests-selection.component.scss']
})
export class InterestsSelectionComponent implements OnInit {
  interestsForm: FormGroup;
  availableInterests: Interest[] = [];
  loading = true;
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private giftSelectionService: GiftSelectionService,
    private animationService: AnimationService,
    private giftApiService: GiftApiService
  ) {
    this.interestsForm = this.fb.group({
      selectedInterests: [[]],
      customInterests: this.fb.array([])
    });
  }

  ngOnInit() {
    this.giftSelectionService.getCriteria().subscribe(criteria => {
      this.giftApiService.getInterests(criteria).subscribe({
        next: (interests) => {
          this.availableInterests = interests;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
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

  toggleInterest(interest: Interest) {
    const currentInterests = this.interestsForm.get('selectedInterests')?.value || [];
    const index = currentInterests.findIndex((i: Interest) => i.id === interest.id);
    
    if (index === -1) {
      currentInterests.push(interest);
    } else {
      currentInterests.splice(index, 1);
    }
    
    this.interestsForm.get('selectedInterests')?.setValue(currentInterests);
  }

  isSelected(interest: Interest): boolean {
    const currentInterests = this.interestsForm.get('selectedInterests')?.value || [];
    return currentInterests.some((i: Interest) => i.id === interest.id);
  }

  onNext(): void {
    if (this.interestsForm.valid) {
      const selectedInterests = this.interestsForm.get('selectedInterests')?.value || [];
      const customInterests = this.customInterests.value.filter((interest: string) => interest.trim());
      
      const allInterests = [
        ...selectedInterests.map((i: Interest) => i.name),
        ...customInterests
      ];
      
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