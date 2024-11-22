import { Routes } from '@angular/router';
import { GenderSelectionComponent } from './components/gender-selection/gender-selection.component';

export const routes: Routes = [
  { path: '', redirectTo: 'gender-selection', pathMatch: 'full' },
  { path: 'gender-selection', component: GenderSelectionComponent }
]; 