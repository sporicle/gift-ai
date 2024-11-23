import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { GiftIdea } from '../models/gift.model';
import { GiftCriteria } from './gift-selection.service';

@Injectable({
  providedIn: 'root'
})
export class GiftApiService {
  private readonly API_URL = 'https://lesson-planning-036412c815a7.herokuapp.com/api/gift_suggestion';

  constructor(private http: HttpClient) {}

  getGiftSuggestions(criteria: GiftCriteria): Observable<GiftIdea[]> {
    const payload = this.formatPayload(criteria);
    
    return this.http.post<any[]>(this.API_URL, payload).pipe(
      map(response => this.mapToGiftIdeas(response))
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

  private mapToGiftIdeas(response: any[]): GiftIdea[] {
    return response.map(item => ({
      id: String(Math.random()), // Generate random ID since it's not in the response
      name: item.name,
      price: item.price,
      justification: item.justification,
      description: item.description,
      productLink: item.product_link,
      imageUrl: item.image_link
    }));
  }
} 