import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { PersonProfileComponent } from './components/person-profile/person-profile.component';
import { InterestsSelectionComponent } from './components/interests-selection/interests-selection.component';
import { PriceSelectionComponent } from './components/price-selection/price-selection.component';
import { ResultsComponent } from './components/results/results.component';
import { SimilarProductsComponent } from './components/similar-products/similar-products.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'person-profile', component: PersonProfileComponent },
  { path: 'interests-selection', component: InterestsSelectionComponent },
  { path: 'price-selection', component: PriceSelectionComponent },
  { path: 'results', component: ResultsComponent },
  { path: 'similar-products/:id', component: SimilarProductsComponent }
]; 