/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { environment } from 'apps/shell/src/environments/environment';

@Component({
  selector: 'refactoring-smartcore-mf-init-screen',
  templateUrl: './init-screen.component.html',
  styleUrls: ['./init-screen.component.scss'],
})
export class InitScreenComponent implements OnInit {
  constructor() {
  }

  ngOnInit(): void {}

  routeParameterizer():void {
    window.location.href=environment.urlParameterizer;
  }
}
