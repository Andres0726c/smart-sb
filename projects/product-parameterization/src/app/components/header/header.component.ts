import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, NavigationEnd } from '@angular/router';
import { DataToast, STATES, ToastMessageComponent } from '../../shared/toast-message/toast-message.component';
import { ModalConfirmDeleteComponent } from '../../shared/modal-confirm-delete/modal-confirm-delete.component';
import { MatDialog } from '@angular/material/dialog';
import { CognitoService } from 'commons-lib';
import { ProductService } from '../../services/product.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  @Input() showOptions = false;

  company = '';
  userName = '';
  role = '';
  sessionLocation = '- Parametrizador de Productos';
  isAuthenticated!: boolean;
  closing = false;

  constructor(public router: Router,
              public service: ProductService,
              private toastMessage: MatSnackBar,
              private cognitoService: CognitoService,
              public dialog: MatDialog) {}

  ngOnInit(): void {
    this.cognitoService.getUser()
    .then((value) => {
      this.company = JSON.parse(value.attributes['custom:sessionInformation']).businessName;
      this.service.companyId = JSON.parse(value.attributes['custom:sessionInformation']).id;
      this.userName = value.username;
      this.role = value.signInUserSession.accessToken.payload['cognito:groups'];
      this.isAuthenticated = true;
    })
    .catch(err => {
      this.isAuthenticated = false;
      this.cognitoService.signOut();
      this.router.navigate(['login']);
    });
    // console.log("");
  }

  /** 
   * Evento que guarda la informaci\u00f3n del producto. 
   */
  saveProduct(showAlerts: boolean):void
  {
    this.service.saveProduct(showAlerts);

    let data: DataToast = {
      status: STATES.success,
      title: 'Guardado exitoso',
      msg: 'El producto se ha guardado correctamente.',
    };

    this.toastMessage.openFromComponent(ToastMessageComponent, {
      data: data,
    });
  }

 /** 
   * Evento que exporta la informaci\u00f3n del producto en formato JSON. 
   */
  exportProduct():void {
    this.service.downloadFile(this.service.initialParameters.get('productName')?.value);
  }

  signOut(): void {
    this.closing = true;
    if(this.service.initialParameters.get('productName')?.value !== "") {
      this.saveProduct(false);        
    }        

    this.cognitoService.signOut()
    .then(() => {
      this.router.navigate(['/autenticacion']);
    });
  }

  /**
   * Event to confirm go to home and save the product
   */
  goToHome():void{
    const dialogRef = this.dialog.open(ModalConfirmDeleteComponent, {
      data: {
        img: 'picto-alert',
        message: `¿Está seguro de querer regresar a la pagina inicial?`,
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if(res){
        this.saveProduct(false)
        this.router.navigate(['productos/menu-productos'])
      }
    })
  }
  goToMenu(){
    this.router.navigate(['/inicio']);
  }
  
}