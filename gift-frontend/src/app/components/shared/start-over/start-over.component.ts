import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GiftSelectionService } from '../../../services/gift-selection.service';
import { GiftApiService } from '../../../services/gift-api.service';

@Component({
  selector: 'app-start-over',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button class="start-over-button" (click)="startOver()">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
      Start Over
    </button>
  `
})
export class StartOverComponent {
  constructor(
    private router: Router,
    private giftSelectionService: GiftSelectionService,
    private giftApiService: GiftApiService
  ) {}

  startOver(): void {
    this.giftSelectionService.clearCriteria();
    this.giftApiService.clearCache();
    this.router.navigate(['/occasion-selection']);
  }
}
