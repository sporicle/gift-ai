import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GiftApiService } from '../../services/gift-api.service';
import { GiftSelectionService } from '../../services/gift-selection.service';
import { GiftIdea } from '../../models/gift.model';
import { Observable, Subscription, catchError, of, switchMap } from 'rxjs';
import { StartOverComponent } from '../shared/start-over/start-over.component';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

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
  private criteriaSubscription: Subscription | null = null;
  private routerSubscription: Subscription | null = null;

  constructor(
    private giftApiService: GiftApiService,
    private giftSelectionService: GiftSelectionService,
    private router: Router
  ) {
    // Only clear cache when navigating from occasion-selection (start over)
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      if (event.url === '/results' && event.urlAfterRedirects === '/results') {
        const previousUrl = this.router.getCurrentNavigation()?.previousNavigation?.finalUrl?.toString();
        if (previousUrl?.includes('occasion-selection')) {
          this.giftApiService.clearCache();
        }
      }
    });
    
    this.giftResults$ = this.giftSelectionService.getCriteria().pipe(
      switchMap(criteria => {
        if (Object.keys(criteria).length === 0) {
          // If no criteria, redirect to start
          this.router.navigate(['/occasion-selection']);
          return of([]);
        }
        return this.giftApiService.getGiftSuggestions(criteria).pipe(
          catchError(error => {
            console.error('Error fetching gift suggestions:', error);
            return of([]);
          })
        );
      })
    );
  }

  ngOnInit(): void {
    let messageIndex = 0;
    this.messageInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % this.loadingMessages.length;
      this.currentLoadingMessage = this.loadingMessages[messageIndex];
    }, 3000);

    // Clean up the interval when results arrive or error occurs
    this.criteriaSubscription = this.giftResults$.subscribe({
      next: (results) => {
        if (results.length > 0) {
          this.clearMessageInterval();
        }
      },
      error: () => this.clearMessageInterval()
    });
  }

  ngOnDestroy(): void {
    this.clearMessageInterval();
    if (this.criteriaSubscription) {
      this.criteriaSubscription.unsubscribe();
    }
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
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