import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GiftSelectionService } from '../../services/gift-selection.service';
import { SelectionSummaryComponent } from '../shared/selection-summary/selection-summary.component';
import { AnimationService } from '../../services/animation.service';
import { StartOverComponent } from '../shared/start-over/start-over.component';

@Component({
  selector: 'app-age-selection',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    SelectionSummaryComponent,
    StartOverComponent
  ],
  templateUrl: './age-selection.component.html',
  styleUrls: ['./age-selection.component.scss']
})
export class AgeSelectionComponent implements OnInit {
  ageForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private giftSelectionService: GiftSelectionService,
    private router: Router,
    private animationService: AnimationService
  ) {
    this.ageForm = this.fb.group({
      age: ['', [
        Validators.required,
        Validators.min(1),
        Validators.max(200),
        Validators.pattern('^[0-9]*$')
      ]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.ageForm.valid) {
      this.giftSelectionService.updateCriteria({
        age: this.ageForm.value.age
      });
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

  get ageControl() {
    return this.ageForm.get('age');
  }
} 