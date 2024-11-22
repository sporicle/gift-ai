import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface GiftCriteria {
  gender?: 'male' | 'female';
  age?: number;
}

@Injectable({
  providedIn: 'root'
})
export class GiftSelectionService {
  private giftCriteria = new BehaviorSubject<GiftCriteria>({});

  updateCriteria(criteria: Partial<GiftCriteria>) {
    this.giftCriteria.next({
      ...this.giftCriteria.value,
      ...criteria
    });
  }

  getCriteria() {
    return this.giftCriteria.asObservable();
  }
} 