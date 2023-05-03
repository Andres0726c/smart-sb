import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { CognitoService } from 'commons-lib';
import { ProductService } from '../services/product.service';
import { FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalAlertComponent } from '../shared/modal-alert/modal-alert.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardParameterizer implements CanActivate {
  
  constructor(
    public router: Router, 
    public cognitoService: CognitoService, 
    public productService: ProductService,
    public dialog: MatDialog
  ) {}
  
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    let check = false;

    await this.cognitoService.getUser()
    .then((value) => {
      check = this.checkAccess(value, state);
    })
    .catch((err) => {
      this.router.navigate(['/autenticacion']);
    });

    return check;
  }

  async canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    let check = false;
    console.log(check);

    await this.cognitoService.getUser()
    .then((value) => {
      check = this.checkAccess(value, state);
    })
    .catch((err) => {
      this.router.navigate(['/autenticacion']);
    });

    return check;
  }
  
  checkAccess(value: any, state: RouterStateSnapshot) {
    let check = false;
    if (
      value 
      && ((Number(localStorage.getItem('CognitoSessionExp')) - (Math.floor((new Date).getTime() / 1000))) > 0) 
      && value.attributes['custom:sessionInformation'] 
      && value.attributes['custom:sessionInformation'] !== '{}' 
      && value.attributes['custom:sessionInformation'] !== ''
      && this.ModuleAccess(value)
    ) {
      check = true;
      if ( this.router.url === '/productos/parametrizador/cumulos' && state.url !== '/productos/parametrizador/cumulos') {
        if ( this.productService.accumulation.get('accumulationType')?.value !== null &&
          (<FormArray>this.productService.accumulation.get('accumulationCoverages'))?.length ===0  ) {
          check = false;
          this.dialog.open(ModalAlertComponent, {
            data: {
              message:
                'Debe asociar al menos una cobertura del producto actual al cúmulo',
            },
          });
        } 
      } else if (state.url.indexOf('/parametrizador') > -1 && this.productService.initialParameters.get('productName')?.value === '') {
        this.router.navigate(['/productos/parametrizador/menu-productos']);
      }
    } else {
      this.cognitoService.signOut()
      .then(() => {
        this.router.navigate(['/autenticacion']);
      });
    }
    return check;
  }

   ModuleAccess(value: any) {
    const moduleAcess: string[] = value.attributes['custom:moduleAccess'].split(",");
  
    return moduleAcess.find(x => x === 'Parametrizar') ? true : false;
       
  }
}
