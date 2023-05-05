import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CognitoService } from '../services/cognito.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private route: Router, private cognitoService: CognitoService) {}
  async canActivate(): Promise<boolean> {
    return await new Promise((resolve) => {
      this.cognitoService.getAuth()
        .then(async(value) => {
          if (value) {
           await this.route.navigate(['/inicio']).then();
          }
        })
        .catch(() => {
          resolve(true);
        });
    });
  }
  
}
