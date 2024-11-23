import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GiftSelectionService } from '../../services/gift-selection.service';
import { SelectionSummaryComponent } from '../shared/selection-summary/selection-summary.component';
import { AnimationService } from '../../services/animation.service';
import { StartOverComponent } from '../shared/start-over/start-over.component';

type Gender = 'male' | 'female';

@Component({
  selector: 'app-person-profile',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    SelectionSummaryComponent,
    StartOverComponent
  ],
  templateUrl: './person-profile.component.html',
  styleUrls: ['./person-profile.component.scss']
})
export class PersonProfileComponent {
  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private giftSelectionService: GiftSelectionService,
    private animationService: AnimationService
  ) {
    this.profileForm = this.fb.group({
      age: ['', [
        Validators.min(1),
        Validators.max(200),
        Validators.pattern('^[0-9]*$')
      ]],
      gender: ['']
    });
  }

  selectGender(gender: Gender): void {
    this.profileForm.patchValue({ gender });
  }

  onSubmit(): void {
    if (this.isFormValid()) {
      const { age, gender } = this.profileForm.value;
      
      // Only include valid values in the criteria update
      const criteria: { age?: number; gender?: Gender } = {};
      if (age) criteria.age = age;
      if (gender) criteria.gender = gender;
      
      this.giftSelectionService.updateCriteria(criteria);
      this.animationService.triggerPageTransition();
      setTimeout(() => {
        this.router.navigate(['/interests-selection']);
      }, 250);
    }
  }

  onSkip(): void {
    this.animationService.triggerPageTransition();
    setTimeout(() => {
      this.router.navigate(['/interests-selection']);
    }, 250);
  }

  isFormValid(): boolean {
    const { age, gender } = this.profileForm.value;
    
    // Form is valid if at least one field has a value AND all filled fields are valid
    return (
      (age || gender) && // At least one field has a value
      (!age || (age && this.ageControl?.valid)) && // If age exists, it must be valid
      (!gender || ['male', 'female'].includes(gender)) // If gender exists, it must be valid
    );
  }

  get ageControl() {
    return this.profileForm.get('age');
  }
}
