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
        .then((value) => {
          if (value) {
            this.route.navigate(['/inicio']);
          }
        })
        .catch(() => {
          resolve(true);
        });
    });
  }
  
}
