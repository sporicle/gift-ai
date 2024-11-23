import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GiftSelectionService } from '../../services/gift-selection.service';

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
    private giftSelectionService: GiftSelectionService
  ) {}

  onGetStarted(): void {
    this.giftSelectionService.clearCriteria();
    this.router.navigate(['/occasion-selection']);
  }
} 