import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { GenderSelectionComponent } from './components/gender-selection/gender-selection.component';
import { AgeSelectionComponent } from './components/age-selection/age-selection.component';
import { RelationshipSelectionComponent } from './components/relationship-selection/relationship-selection.component';
import { OccasionSelectionComponent } from './components/occasion-selection/occasion-selection.component';
import { InterestsSelectionComponent } from './components/interests-selection/interests-selection.component';
import { PriceSelectionComponent } from './components/price-selection/price-selection.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'occasion-selection', component: OccasionSelectionComponent },
  { path: 'relationship-selection', component: RelationshipSelectionComponent },
  { path: 'gender-selection', component: GenderSelectionComponent },
  { path: 'age-selection', component: AgeSelectionComponent },
  { path: 'interests-selection', component: InterestsSelectionComponent },
  { path: 'price-selection', component: PriceSelectionComponent }
]; 