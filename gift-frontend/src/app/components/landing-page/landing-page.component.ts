import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GiftSelectionService } from '../../services/gift-selection.service';
import { GiftApiService } from '../../services/gift-api.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  constructor(
    private router: Router,
    private giftSelectionService: GiftSelectionService,
    private giftApiService: GiftApiService
  ) {}

  onGetStarted(): void {
    this.giftSelectionService.clearCriteria();
    this.giftApiService.clearCache();
    this.router.navigate(['/occasion-selection']);
  }
} 