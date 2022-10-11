import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from '@refactoring-smartcore-mf/refactoring-smartcore-commons-lib';

@Component({
  selector: 'refactoring-smartcore-mf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Smartcore';

  constructor(private titleService: Title) {
    this.titleService.setTitle(environment.smartcoreSiteTitle);
  }
}
