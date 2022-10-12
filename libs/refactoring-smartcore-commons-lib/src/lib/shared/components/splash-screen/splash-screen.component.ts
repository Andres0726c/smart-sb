import { Component, OnInit } from '@angular/core';
import { SplashScreenService } from '@refactoring-smartcore-mf/refactoring-smartcore-commons-lib';

@Component({
  selector: 'refactoring-smartcore-mf-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss']
})
export class SplashScreenComponent implements OnInit {
  // The screen starts with the maximum opacity
  public opacityChange = 1;
  public splashTransition: any;
  // First access the splash is visible
  public showSplash = true;
  readonly ANIMATION_DURATION = 0.4;

  constructor(private splashService: SplashScreenService) { 
    //
  }

  ngOnInit(): void {
    // Somewhere the stop method has been invoked
    this.splashService.subscribe(() => {
      this.hideSplashAnimation();
    });
  }

  public hideSplashAnimation() {
    // Setting the transition
    this.splashTransition = `opacity ${this.ANIMATION_DURATION}s`;
    this.opacityChange = 0;
    setTimeout(() => {
      // After the transition is ended the showSplash will be hided
      this.showSplash = !this.showSplash;
    }, 1000);
  }

}
