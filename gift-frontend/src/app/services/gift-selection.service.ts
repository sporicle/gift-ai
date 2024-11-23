import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface GiftCriteria {
  gender?: 'male' | 'female';
  age?: number;
  relationship?: string;
  occasion?: string;
  interests?: string[];
  price?: number;
}

@Injectable({
  providedIn: 'root'
})
export class GiftSelectionService {
  private readonly STORAGE_KEY = 'giftCriteria';
  private giftCriteria = new BehaviorSubject<GiftCriteria>(this.loadFromStorage());

  private loadFromStorage(): GiftCriteria {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  }

  private saveToStorage(criteria: GiftCriteria) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(criteria));
  }

  updateCriteria(criteria: Partial<GiftCriteria>) {
    const updatedCriteria = {
      ...this.giftCriteria.value,
      ...criteria
    };
    this.giftCriteria.next(updatedCriteria);
    this.saveToStorage(updatedCriteria);
  }

  getCriteria() {
    return this.giftCriteria.asObservable();
  }

  clearCriteria() {
    localStorage.removeItem(this.STORAGE_KEY);
    this.giftCriteria.next({});
  }
} 