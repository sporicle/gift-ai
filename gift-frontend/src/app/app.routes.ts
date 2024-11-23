import { Routes } from '@angular/router';
import { GenderSelectionComponent } from './components/gender-selection/gender-selection.component';
import { AgeSelectionComponent } from './components/age-selection/age-selection.component';
import { RelationshipSelectionComponent } from './components/relationship-selection/relationship-selection.component';

export const routes: Routes = [
  { path: '', redirectTo: 'gender-selection', pathMatch: 'full' },
  { path: 'gender-selection', component: GenderSelectionComponent },
  { path: 'age-selection', component: AgeSelectionComponent },
  { path: 'relationship-selection', component: RelationshipSelectionComponent }
]; 