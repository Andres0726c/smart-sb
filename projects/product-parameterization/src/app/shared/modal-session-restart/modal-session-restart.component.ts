import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CognitoService } from 'commons-lib';
import { MyErrorStateMatcher } from '../../core/error-state-matcher/error-state-matcher';
import { ModalAlertComponent } from '../modal-alert/modal-alert.component';

@Component({
  selector: 'app-modal-session-restart',
  templateUrl: './modal-session-restart.component.html',
  styleUrls: ['./modal-session-restart.component.scss']
})
export class ModalSessionRestartComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  passwordTypeInput  =  'password';
  iconpassword  =  'fal fa-eye';
  formData: FormGroup;
  isDataValid = true;
  isLoading = false;

  constructor(
    public cognitoService: CognitoService,
    public fb: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ModalSessionRestartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      userName: string,
      company: any
    }
  ) {
    this.formData = fb.group(
      {
        email: data.userName,
        password: fb.control('', [Validators.required])
      });
   }

  ngOnInit(): void {
    //
  }

  /**
   * Determina si el valor ingresado en campo de la instacia form tiene error de validaci\u00f3n.
   * @param formControlName identificador del input con el valor a validar.
   * @param errorName       identificador del error que se despliega.
   * @returns TRUE si hay error en la validaci\u00f3n, FALSE en caso contrario.
   */
   public hasError(formControlName: string, errorName: string) {
    return this.formData.controls[formControlName].hasError(errorName);
  }

  showPassword(){
    this.passwordTypeInput  =  this.passwordTypeInput  ===  'text'  ?  'password'  :  'text';
    this.iconpassword  =  this.iconpassword  ===  'fal fa-eye'  ?  'fal fa-low-vision'  :  'fal fa-eye';
  }

  logIn() {
    this.isLoading = true;
    this.cognitoService.signIn(this.formData.get('email')?.value, this.formData.get('password')?.value)
    .then(async user => {
      const groups = user.signInUserSession.accessToken.payload["cognito:groups"]
      if (groups && groups.includes('TLN') && user.attributes['custom:company']) {
        await this.setCompany(this.data.company).then();
      } else { 
        await this.forbidden().then().catch();
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

  async setCompany(company: any) {
    this.isLoading = true;
    await this.cognitoService.setUserCompany(company)
    .then(res => {
      this.dialogRef.close(true);
    })
    .catch(err => {
      this.isLoading = false;
      console.log('Error al instanciar la compañía en la sesión del usuario');
    });
  }
  
  async forbidden(){
    this.dialog.open(ModalAlertComponent,
      {
        data: {message:'El usuario no cuenta con los permisos para ingresar a la aplicación. Por favor contacte al administrador del sistema.'}
    })
    await this.cognitoService.signOut().then();
  }

}
