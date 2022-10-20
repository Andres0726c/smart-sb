import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiRequestsService, CognitoService } from 'commons-lib';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'refactoring-smartcore-mf-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formData: FormGroup;
  formCompany: FormGroup;
  companies: any = [];
  isDataValid = true;
  isLoading = false;
  showCompanySelection = false;

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public cognitoService: CognitoService,
    public apiService: ApiRequestsService
  ) {
    this.formData = fb.group({
      email: fb.control('', [Validators.required, Validators.pattern('^[^@]+@[^@]+\.[a-zA-Z]{2,}$')]),
      password: fb.control('', [Validators.required])
    });

    this.formCompany = this.fb.group({
      company: fb.control(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    //
  }

  logIn() {
    this.isLoading = true;
    this.cognitoService.signIn(this.formData.get('email')?.value, this.formData.get('password')?.value)
      .then(async user => {
        const groups = user.signInUserSession.accessToken.payload["cognito:groups"]
        if (groups && groups.includes('TLN') && user.attributes['custom:company']) {
          const company = user.attributes['custom:company'];
          await this.getCompanies(company);
          if (this.companies.length > 1) {
            // Se muestra la modal de selección de compañia
            /*const dialogRef = this.dialog.open(ModalCompanyComponent, {
              data: { data: this.companies }
            });*/
            this.showCompanySelection = true;
            //alert('varias compañias');
            /*dialogRef.afterClosed().subscribe(async (res) => {
              if (res) {
                this.setCompany(res);
              } else {
                await this.cognitoService.signOut();
                this.isLoading = false;
              }
            });*/
          } else {
            this.setCompany(this.companies[0]);
          }
        } else {
          this.forbidden()
          this.isLoading = false;
        }
      })
      .catch(err => {
        if (err.code == 'UserNotFoundException' || err.code == 'NotAuthorizedException' || err.code == 'InvalidParameterException') {
          this.isDataValid = false;
        }
        this.isLoading = false;
      });
  }

  async getCompanies(idCompany: string) {
    try {
      let res: any = await lastValueFrom(this.apiService.getApiData('company/companies', idCompany));
      if (res.dataHeader.hasErrors === false) {
        this.companies = res.body;
        return res.body;
      }
    } catch (error) {
      console.log('ocurrio un error:', error);
      return error;
    }
  }

  selectCompany() {
    console.log('data', this.formCompany)
  }

  async setCompany(company: any) {
    this.showCompanySelection = false;
    this.isLoading = true;
    await this.cognitoService.setUserCompany(company)
      .then(res => {
        this.router.navigate(['inicio']);
      })
      .catch(err => {
        this.isLoading = false;
        console.log('Error al instanciar la compañía en la sesión del usuario');
      });
  }

  forbidden() {
    /* this.dialog.open(ModalAlertComponent,
      {
        data: {message:'El usuario no cuenta con los permisos para ingresar a la aplicación. Por favor contacte al administrador del sistema.'}
    }) */
    alert('algo falló')
    this.cognitoService.signOut();
  }

  /**
   * Sí el usuario presiona la tecla Enter se redireccionará hacia el método de login
   * @param event evento que contiene informacion de la tecla presionada
   * @returns si se presiona cualquier tecla diferente a ENTER, devuelve void, de lo contrario redirecciona a la función de login
   */
   public hasEnterKey(event:any) {
    event.stopImmediatePropagation();
    if (event.keyCode === 13 || event.key === "Enter") {
      this.logIn();
    }
  }
}
