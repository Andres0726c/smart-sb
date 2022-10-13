import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subject, Subscription, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SplashScreenService {
  subject = new Subject();

  constructor(private _router: Router) {
    // Hide it on the first NavigationEnd event
    this._router.events
    .pipe(
        filter(event => event instanceof NavigationEnd),
        take(1)
    )
    .subscribe(() => {
        this.stop();
    });
  }

  subscribe(onNext: any): Subscription {
    return this.subject.subscribe(onNext);
  }
  
  stop() {
    setTimeout(() => {
      // After the transition is ended the showSplash will be hided
      this.subject.next(false);
    }, 500);
    
  }
}
