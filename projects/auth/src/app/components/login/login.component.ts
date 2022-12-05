import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiRequestsService, CognitoService } from 'commons-lib';
import { Dropdown } from 'primeng/dropdown';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'refactoring-smartcore-mf-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('drpdwnCompany') drpdwnCompany!: Dropdown;
  formData: FormGroup;
  formCompany: FormGroup;
  companies: any = [];
  isDataValid = true;
  isLoading = false;
  showCompanySelection = false;
  showModalForbhidden = false;
  companySelectionComplete = false;

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public cognitoService: CognitoService,
    public apiService: ApiRequestsService
  ) {
    this.formData = fb.group({
      email: fb.control('', [
        Validators.required,
        Validators.pattern('^[^@]+@[^@]+.[a-zA-Z]{2,}$'),
      ]),
      password: fb.control('', [Validators.required]),
    });

    this.formCompany = this.fb.group({
      company: fb.control(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    //
  }

  /**
   * Función que permite la autenticación a través del servicio de cognito
   */
  logIn() {
    this.isLoading = true;
    this.cognitoService
      .signIn(
        this.formData.get('email')?.value,
        this.formData.get('password')?.value
      )
      .then(async (user) => {
        const groups =
          user.signInUserSession.accessToken.payload['cognito:groups'];
        if (
          groups &&
          groups.includes('TLN') &&
          user.attributes['custom:company']
        ) {
          const company = user.attributes['custom:company'];
          await this.getCompanies(company);
          if (this.companies.length > 1) {
            this.formCompany.reset();
            this.companySelectionComplete = false;
            this.showCompanySelection = true;
          } else {
            this.setCompany(this.companies[0]);
          }
        } else {
          this.forbidden();
          this.isLoading = false;
        }
      })
      .catch((err) => {
        if (
          err.code == 'UserNotFoundException' ||
          err.code == 'NotAuthorizedException' ||
          err.code == 'InvalidParameterException'
        ) {
          this.isDataValid = false;
        }
        this.isLoading = false;
      });
  }

  /**
   * Función que permite consular el listado de las compañías asociadas al usuario en cognito
   * @param idCompany Ids de las compañías a consultar en la base de datos
   * @returns Retorna el listado de compañías en caso exitoso o un flag de error en caso de falla en el consumo del MS
   */
  async getCompanies(idCompany: string) {
    try {
      let res: any = await lastValueFrom(
        this.apiService.getApiData('company/companies', idCompany)
      );
      if (res.dataHeader.hasErrors === false) {
        this.companies = res.body;
        return res.body;
      }
    } catch (error) {
      console.log('ocurrio un error:', error);
      this.companySelectionComplete = false;
      this.showCompanySelection = false;
      this.isLoading = false;
      return error;
    }
  }
  
  /**
   * Funcion que permite settear en cognito la compañia seleccionada por el usuario durante el proceso de autenticación
   * @param company Objeto con la información de la compañía seleccionada
   */
  async setCompany(company: any) {
    this.companySelectionComplete = true;
    this.showCompanySelection = false;
    this.isLoading = true;
    await this.cognitoService
      .setUserCompany(company)
      .then((res) => {
        this.router.navigate(['inicio']);
      })
      .catch((err) => {
        this.isLoading = false;
        console.log('Error al instanciar la compañía en la sesión del usuario');
      });
  }

  /**
   * Función que permite mostrar un mensaje de error cuando el usuario no tiene los permisos suficientes para ingresar a la aplicación
   */
  forbidden() {
    this.showModalForbhidden = true;
    this.cognitoService.signOut();
  }

  /**
   * Sí el usuario presiona la tecla Enter se redireccionará hacia el método de login
   * @param event evento que contiene informacion de la tecla presionada
   * @returns si se presiona cualquier tecla diferente a ENTER, devuelve void, de lo contrario redirecciona a la función de login
   */
  public hasEnterKey(event: any) {
    event.stopImmediatePropagation();
    if (event.keyCode === 13 || event.key === 'Enter') {
      this.logIn();
    }
  }

  /**
   * Función que detecta el cierre de la modal de selección de compañía y cierra la sesión del usuario al no completarse la autenticación correctamente
   */
  closeModalCompany() {
    if (!this.companySelectionComplete) {
      this.cognitoService.signOut().then(() => {
        this.isLoading = false;
      });
    }
  }
}
