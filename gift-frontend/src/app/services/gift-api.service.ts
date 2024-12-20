import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of, catchError, delay, switchMap } from 'rxjs';
import { GiftIdea } from '../models/gift.model';
import { GiftCriteria, GiftSelectionService } from './gift-selection.service';

export interface Interest {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class GiftApiService {
  private readonly GIFT_SUGGESTION_API_URL = 'https://lesson-planning-036412c815a7.herokuapp.com/api/gift_suggestion';
  private readonly SIMILAR_PRODUCTS_API_URL = 'https://lesson-planning-036412c815a7.herokuapp.com/api/related_gifts';
  private readonly INTERESTS_API_URL = 'https://lesson-planning-036412c815a7.herokuapp.com/api/tailored_interests';
  private readonly CACHE_KEY = 'cachedGiftResults';

  constructor(
    private http: HttpClient,
    private giftSelectionService: GiftSelectionService
  ) {}

  getGiftSuggestions(criteria: GiftCriteria): Observable<GiftIdea[]> {
    // Check if we have cached results
    const cachedResults = this.getCachedResults();
    if (cachedResults) {
      return of(cachedResults);
    }

    const payload = this.formatPayload(criteria);
    
    return this.http.post<any[]>(this.GIFT_SUGGESTION_API_URL, payload).pipe(
      map(response => {
        const giftIdeas = this.mapToGiftIdeas(response);
        this.cacheResults(giftIdeas);
        return giftIdeas;
      })
    );
  }

  private formatPayload(criteria: GiftCriteria): any {
    return {
      interests: criteria.interests?.join(', '),
      price: criteria.price ? `$${criteria.price}` : undefined,
      gender: criteria.gender,
      age: criteria.age,
      relationship: criteria.relationship,
      occasion: criteria.occasion
    };
  }

  getSimilarProducts(giftIdea: GiftIdea): Observable<GiftIdea[]> {
    const payload = {
        product_name: giftIdea.name,
        price: giftIdea.price,
    };
    return this.http.post<any[]>(this.SIMILAR_PRODUCTS_API_URL, payload).pipe(
      map(response => this.mapToGiftIdeas(response))
    );
  }

  private mapToGiftIdeas(response: any[]): GiftIdea[] {
    return response.map(item => ({
      id: String(Math.random()),
      name: item.name,
      price: item.price,
      justification: item.justification,
      description: item.description,
      productLink: item.product_link,
      imageUrl: item.image_link
    }));
  }

  private cacheResults(results: GiftIdea[]): void {
    localStorage.setItem(this.CACHE_KEY, JSON.stringify(results));
  }

  private getCachedResults(): GiftIdea[] | null {
    const cached = localStorage.getItem(this.CACHE_KEY);
    return cached ? JSON.parse(cached) : null;
  }

  clearCache(): void {
    localStorage.removeItem(this.CACHE_KEY);
  }

  getInterests(criteria: GiftCriteria): Observable<Interest[]> {
    console.log('criteria', criteria);
    const payload = {
      gender: criteria.gender,
      age: criteria.age
    };

    return this.http.post<any[]>(this.INTERESTS_API_URL, payload).pipe(
      map(response => {
        return response.map((item, index) => ({
          id: String(index + 1),
          name: item.interest
        }));
      }),
      catchError(error => {
        console.error('Error fetching interests:', error);
        return of([]);
      })
    );
  }
} 