import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GiftSelectionService } from '../../services/gift-selection.service';
import { SelectionSummaryComponent } from '../shared/selection-summary/selection-summary.component';
import { AnimationService } from '../../services/animation.service';
import { StartOverComponent } from '../shared/start-over/start-over.component';

@Component({
  selector: 'app-price-selection',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    SelectionSummaryComponent,
    StartOverComponent
  ],
  templateUrl: './price-selection.component.html',
  styleUrls: ['./price-selection.component.scss']
})
export class PriceSelectionComponent {
  priceForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private giftSelectionService: GiftSelectionService,
    private animationService: AnimationService
  ) {
    this.priceForm = this.fb.group({
      price: ['', [
        Validators.required,
        Validators.min(0),
        Validators.pattern('^[0-9]*\.?[0-9]*$')
      ]]
    });
  }

  onSubmit(): void {
    if (this.priceForm.valid) {
      this.giftSelectionService.updateCriteria({
        price: this.priceForm.value.price
      });
      this.animationService.triggerPageTransition();
      setTimeout(() => {
        this.router.navigate(['/results']);
      }, 250);
    }
  }

  get priceControl() {
    return this.priceForm.get('price');
  }

  onSkip(): void {
    this.animationService.triggerPageTransition();
    setTimeout(() => {
      this.router.navigate(['/results']);
    }, 250);
  }
} 