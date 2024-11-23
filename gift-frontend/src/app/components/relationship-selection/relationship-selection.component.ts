import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GiftSelectionService } from '../../services/gift-selection.service';
import { SelectionSummaryComponent } from '../shared/selection-summary/selection-summary.component';
import { AnimationService } from '../../services/animation.service';
import { StartOverComponent } from '../shared/start-over/start-over.component';

type Relationship = 'friend' | 'parent' | 'partner' | 'work colleague' | 'other';

@Component({
  selector: 'app-relationship-selection',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SelectionSummaryComponent, StartOverComponent],
  templateUrl: './relationship-selection.component.html',
  styleUrls: ['./relationship-selection.component.scss']
})
export class RelationshipSelectionComponent {
  selectedRelationship: Relationship | null = null;
  relationshipForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private giftSelectionService: GiftSelectionService,
    private animationService: AnimationService
  ) {
    this.relationshipForm = this.fb.group({
      otherRelationship: ['']
    });
  }

  selectRelationship(relationship: Relationship): void {
    this.selectedRelationship = relationship;
    if (relationship !== 'other') {
      this.relationshipForm.get('otherRelationship')?.setValue('');
    }
  }

  onNext(): void {
    const relationship = this.selectedRelationship === 'other' 
      ? this.relationshipForm.get('otherRelationship')?.value 
      : this.selectedRelationship;

    if (relationship) {
      this.giftSelectionService.updateCriteria({
        relationship: relationship
      });
      this.animationService.triggerPageTransition();
      setTimeout(() => {
        this.router.navigate(['/person-profile']);
      }, 250);
    }
  }

  onSkip(): void {
    this.animationService.triggerPageTransition();
    setTimeout(() => {
      this.router.navigate(['/person-profile']);
    }, 250);
  }
}
