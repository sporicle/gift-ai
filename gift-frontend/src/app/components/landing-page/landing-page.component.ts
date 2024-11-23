import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GiftSelectionService, PREDEFINED_OCCASIONS, PREDEFINED_RELATIONSHIPS } from '../../services/gift-selection.service';
import { GiftApiService } from '../../services/gift-api.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  giftForm: FormGroup;
  filteredOccasions: string[] = [...PREDEFINED_OCCASIONS];
  filteredRelationships: string[] = [...PREDEFINED_RELATIONSHIPS];
  showOccasionDropdown = false;
  showRelationshipDropdown = false;
  selectedOccasionIndex = -1;
  selectedRelationshipIndex = -1;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private giftSelectionService: GiftSelectionService,
    private giftApiService: GiftApiService
  ) {
    this.giftForm = this.fb.group({
      occasion: [''],
      relationship: ['']
    });
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (!this.showOccasionDropdown && !this.showRelationshipDropdown) {
      return;
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.handleArrowDown();
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.handleArrowUp();
        break;
      case 'Enter':
      case 'Tab':
        if (this.hasSelectedOption()) {
          event.preventDefault(); // Prevent default tab behavior if we have a selection
          this.handleEnter();
        }
        break;
      case 'Escape':
        this.handleEscape();
        break;
    }
  }

  private handleArrowDown(): void {
    if (this.showOccasionDropdown) {
      this.selectedOccasionIndex = Math.min(
        this.selectedOccasionIndex + 1,
        this.filteredOccasions.length - 1
      );
      this.scrollToSelected('occasion');
    } else if (this.showRelationshipDropdown) {
      this.selectedRelationshipIndex = Math.min(
        this.selectedRelationshipIndex + 1,
        this.filteredRelationships.length - 1
      );
      this.scrollToSelected('relationship');
    }
  }

  private handleArrowUp(): void {
    if (this.showOccasionDropdown) {
      this.selectedOccasionIndex = Math.max(this.selectedOccasionIndex - 1, -1);
      this.scrollToSelected('occasion');
    } else if (this.showRelationshipDropdown) {
      this.selectedRelationshipIndex = Math.max(this.selectedRelationshipIndex - 1, -1);
      this.scrollToSelected('relationship');
    }
  }

  private hasSelectedOption(): boolean {
    return (this.showOccasionDropdown && this.selectedOccasionIndex >= 0) ||
           (this.showRelationshipDropdown && this.selectedRelationshipIndex >= 0);
  }

  private handleEnter(): void {
    if (this.showOccasionDropdown && this.selectedOccasionIndex >= 0) {
      this.selectOccasion(this.filteredOccasions[this.selectedOccasionIndex]);
    } else if (this.showRelationshipDropdown && this.selectedRelationshipIndex >= 0) {
      this.selectRelationship(this.filteredRelationships[this.selectedRelationshipIndex]);
    }
  }

  private handleEscape(): void {
    if (this.showOccasionDropdown) {
      this.showOccasionDropdown = false;
      this.selectedOccasionIndex = -1;
    }
    if (this.showRelationshipDropdown) {
      this.showRelationshipDropdown = false;
      this.selectedRelationshipIndex = -1;
    }
  }

  private scrollToSelected(type: 'occasion' | 'relationship'): void {
    const index = type === 'occasion' ? this.selectedOccasionIndex : this.selectedRelationshipIndex;
    if (index >= 0) {
      const element = document.querySelector(
        `.dropdown-item[data-index="${index}"][data-type="${type}"]`
      );
      element?.scrollIntoView({ block: 'nearest' });
    }
  }

  filterOccasions(event: Event): void {
    const value = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredOccasions = [...PREDEFINED_OCCASIONS]
      .filter(occasion => occasion.toLowerCase().includes(value));
    this.selectedOccasionIndex = -1; // Reset selection when filtering
  }

  filterRelationships(event: Event): void {
    const value = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredRelationships = [...PREDEFINED_RELATIONSHIPS]
      .filter(relationship => relationship.toLowerCase().includes(value));
    this.selectedRelationshipIndex = -1; // Reset selection when filtering
  }

  selectOccasion(occasion: string): void {
    this.giftForm.patchValue({ occasion });
    this.showOccasionDropdown = false;
    this.selectedOccasionIndex = -1;
  }

  selectRelationship(relationship: string): void {
    this.giftForm.patchValue({ relationship });
    this.showRelationshipDropdown = false;
    this.selectedRelationshipIndex = -1;
  }

  onGetStarted(): void {
    const { occasion, relationship } = this.giftForm.value;
    this.giftSelectionService.clearCriteria();
    this.giftApiService.clearCache();
    
    if (occasion || relationship) {
      this.giftSelectionService.updateCriteria({
        occasion: occasion || undefined,
        relationship: relationship || undefined
      });
    }
    
    this.router.navigate(['/person-profile']);
  }

  hideOccasionDropdownDelayed(): void {
    setTimeout(() => {
      this.showOccasionDropdown = false;
    }, 50);
  }

  hideRelationshipDropdownDelayed(): void {
    setTimeout(() => {
      this.showRelationshipDropdown = false;
    }, 50);
  }

  handleDropdownMousedown(event: Event): void {
    event.preventDefault();
  }
} 