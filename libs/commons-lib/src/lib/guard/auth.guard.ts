import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { CognitoService } from '../services/cognito.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    public router: Router, 
    public cognitoService: CognitoService
  ) {}
  
  async canActivate(
    routerSnap: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    let check = false;

    await this.cognitoService.getUser()
    .then((value) => {
      check = this.verifyAccess(value, state);
    })
    .catch((err) => {
      this.router.navigate(['/autenticacion']).then();
    });

    return check;
  }
  
  verifyAccess(value: any, state: RouterStateSnapshot) {
    let access = false;
    if (
      value 
      && ((Number(localStorage.getItem('CognitoSessionExp')) - (Math.floor((new Date).getTime() / 1000))) > 0) 
      && value.attributes['custom:sessionInformation'] 
      && value.attributes['custom:sessionInformation'] !== '{}' 
      && value.attributes['custom:sessionInformation'] !== ''
    ) {
      access = true;
    } else {
      this.cognitoService.signOut()
      .then(() => {
        this.router.navigate(['/autenticacion']);
      })
      .catch((err) => {
        console.error('Error al cerrar sesión');
      });
    }
    return access;
  }
}
