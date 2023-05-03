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

    const nameModule = routerSnap.data['module'];
    console.log(routerSnap);
    console.log(state);

    await this.cognitoService.getUser()
    .then((value) => {
      check = this.verifyAccess(value, state, nameModule);
    })
    .catch((err) => {
      this.router.navigate(['/autenticacion']);
    });

    return check;
  }
  
  verifyAccess(value: any, state: RouterStateSnapshot, nameModule:string) {
    let access = false;
    if (
      value 
      && ((Number(localStorage.getItem('CognitoSessionExp')) - (Math.floor((new Date).getTime() / 1000))) > 0) 
      && value.attributes['custom:sessionInformation'] 
      && value.attributes['custom:sessionInformation'] !== '{}' 
      && value.attributes['custom:sessionInformation'] !== ''
      && this.ModuleAccess(value,nameModule,state)
    ) {
      access = true;
    } else {
      this.cognitoService.signOut()
      .then(() => {
        this.router.navigate(['/autenticacion']);
      });
    }
    return access;
  }

  ModuleAccess(value: any,  nameModule:string,state: RouterStateSnapshot) {
    let moduleName =  nameModule;
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
