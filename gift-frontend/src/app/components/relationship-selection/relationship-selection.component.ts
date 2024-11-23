import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GiftSelectionService } from '../../services/gift-selection.service';

type Relationship = 'friend' | 'parent' | 'partner' | 'work colleague' | 'other';

@Component({
  selector: 'app-relationship-selection',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './relationship-selection.component.html',
  styleUrls: ['./relationship-selection.component.scss']
})
export class RelationshipSelectionComponent {
  selectedRelationship: Relationship | null = null;
  relationshipForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private giftSelectionService: GiftSelectionService
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
      this.router.navigate(['/results']);
    }
  }
}
