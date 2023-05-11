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
    .catch(async (err) => {
      await this.router.navigate(['/autorizacion']).then();
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
      && this.ModuleAccess(value,state)
    ) {
      access = true;
    } else {
      this.cognitoService.signOut()
      .then(async () => {
        await this.router.navigate(['/autorizacion']).then();
      })
      .catch((err) => {
        console.error('Error al cerrar sesión');
      });
    }
    return access;
  }

  ModuleAccess(value: any, state: RouterStateSnapshot) {
    
    const moduleAcess: string[] = value.attributes['custom:moduleAccess']?.split(",");
    if (moduleAcess) {
        if (state.url === '/polizas/consulta'){
          return moduleAcess.find(x => x === 'Consultar') ? true : false;
        } else if (state.url === '/productos/menu-productos'){
          return moduleAcess.find(x => x === 'Parametrizar') ? true : false;
        }else if (state.url.includes('/polizas/modificar/')){
          return moduleAcess.find(x => x === 'Modificar') ? true : false;
        }
        else{
          return true
        }
    }
    return true;
  }
}
