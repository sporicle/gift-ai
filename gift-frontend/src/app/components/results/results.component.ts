import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GiftApiService } from '../../services/gift-api.service';
import { GiftSelectionService } from '../../services/gift-selection.service';
import { GiftIdea } from '../../models/gift.model';
import { Observable, switchMap } from 'rxjs';
import { StartOverComponent } from '../shared/start-over/start-over.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule, StartOverComponent],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit, OnDestroy {
  giftResults$: Observable<GiftIdea[]>;
  currentLoadingMessage: string = 'Analyzing preferences...';
  private loadingMessages: string[] = [
    'Analyzing preferences...',
    'Searching for unique ideas...',
    'Curating personalized suggestions...',
    'Finding the perfect matches...',
    'Almost there...'
  ];
  private messageInterval: any;

  constructor(
    private giftApiService: GiftApiService,
    private giftSelectionService: GiftSelectionService,
    private router: Router
  ) {
    this.giftResults$ = this.giftSelectionService.getCriteria().pipe(
      switchMap(criteria => this.giftApiService.getGiftSuggestions(criteria))
    );
  }

  ngOnInit(): void {
    let messageIndex = 0;
    this.messageInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % this.loadingMessages.length;
      this.currentLoadingMessage = this.loadingMessages[messageIndex];
    }, 3000);

    // Clean up the interval when results arrive
    this.giftResults$.subscribe({
      next: () => this.clearMessageInterval(),
      error: () => this.clearMessageInterval()
    });
  }

  ngOnDestroy(): void {
    this.clearMessageInterval();
  }

  private clearMessageInterval(): void {
    if (this.messageInterval) {
      clearInterval(this.messageInterval);
      this.messageInterval = null;
    }
  }

  openProductLink(url: string): void {
    window.open(url, '_blank');
  }

  seeSimilarProducts(gift: GiftIdea): void {
    this.router.navigate(['/similar-products', gift.id], {
      state: { product: gift }
    });
  }
} 