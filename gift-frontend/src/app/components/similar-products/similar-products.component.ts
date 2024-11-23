import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { GiftApiService } from '../../services/gift-api.service';
import { GiftIdea } from '../../models/gift.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-similar-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './similar-products.component.html',
  styleUrls: ['./similar-products.component.scss']
})
export class SimilarProductsComponent implements OnInit {
  originalProduct: GiftIdea | null = null;
  similarProducts$: Observable<GiftIdea[]> | null = null;
  isOriginalProductExpanded = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private giftApiService: GiftApiService
  ) {}

  ngOnInit() {
    const state = history.state;
    if (state && state.product) {
      this.originalProduct = state.product;
      this.similarProducts$ = this.giftApiService.getSimilarProducts(this.originalProduct!);
    }
  }

  goBack() {
    this.router.navigate(['/results']);
  }

  openProductLink(url: string): void {
    window.open(url, '_blank');
  }

  toggleOriginalProduct(): void {
    this.isOriginalProductExpanded = !this.isOriginalProductExpanded;
  }
} 