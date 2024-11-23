import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GiftSelectionService } from '../../services/gift-selection.service';

@Component({
  selector: 'app-age-selection',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './age-selection.component.html',
  styleUrls: ['./age-selection.component.scss']
})
export class AgeSelectionComponent implements OnInit {
  ageForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private giftSelectionService: GiftSelectionService,
    private router: Router
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
      // Navigate to next page (you can change this to your desired route)
      this.router.navigate(['/relationship-selection']);
    }
  }

  get ageControl() {
    return this.ageForm.get('age');
  }
} 