import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  private pageTransition = new BehaviorSubject<boolean>(false);
  
  pageTransition$ = this.pageTransition.asObservable();
  
  triggerPageTransition() {
    // Do nothing for now. Pages have a default transition that's 
    // good enough for now.
  }
}
