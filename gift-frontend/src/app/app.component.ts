import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AnimationService } from './services/animation.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  template: `
    <main>
      <div class="page-container" [class.transitioning]="pageTransition$ | async">
        <router-outlet />
      </div>
    </main>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  pageTransition$;
  
  constructor(private animationService: AnimationService) {
    this.pageTransition$ = this.animationService.pageTransition$;
  }
}
