/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoService } from 'commons-lib';

@Component({
  selector: 'refactoring-smartcore-mf-init-screen',
  templateUrl: './init-screen.component.html',
  styleUrls: ['./init-screen.component.scss'],
})
export class InitScreenComponent {

  moduleAcess:any;

  constructor(public router: Router, private cognitoService: CognitoService) {
    
  }

  ngOnInit(): void {
    this.cognitoService
      .getUser()
      .then((value) => {
        this.moduleAcess = value.attributes['custom:moduleAccess'].split(",");
      })
  }

  getModule(nameModule: any) {
    return this.moduleAcess.find((x: any) => x === nameModule) ? true : false;
  }

}


