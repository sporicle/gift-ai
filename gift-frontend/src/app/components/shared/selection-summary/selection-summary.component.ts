import { Component, OnInit, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GiftSelectionService, GiftCriteria } from '../../../services/gift-selection.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-selection-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './selection-summary.component.html',
  styleUrls: ['./selection-summary.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SelectionSummaryComponent implements OnInit {
  criteria$: Observable<GiftCriteria>;
  isExpanded = false;
  isInitialized = false;

  constructor(
    private giftSelectionService: GiftSelectionService,
    private cdr: ChangeDetectorRef
  ) {
    this.criteria$ = this.giftSelectionService.getCriteria();
  }

  ngOnInit() {
    // Use requestAnimationFrame to ensure the initial state is set before transitions
    requestAnimationFrame(() => {
      setTimeout(() => {
        this.isInitialized = true;
      }, 50);
    });
  }

  toggleExpansion(): void {
    this.isExpanded = !this.isExpanded;
  }

  formatValue(value: any): string {
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    return value;
  }
} 