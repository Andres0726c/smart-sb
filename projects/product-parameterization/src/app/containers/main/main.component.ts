import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CognitoService } from 'commons-lib';
import { ProductService } from '../../services/product.service';
import { ModalSessionRestartComponent } from '../../shared/modal-session-restart/modal-session-restart.component';

@Component({
  selector: 'refactoring-smartcore-mf-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  userName = '';
  company: any = null;
  userActivity: any;

  constructor(
    public router: Router,
    public cognitoService: CognitoService,
    public productService: ProductService,
    public dialog: MatDialog,
  ) {
    cognitoService.authenticationSubject.subscribe((valueSession) => {
      if (!valueSession && router.url.includes('/productos')) {
        cognitoService.getUser()
        .then((value) => {
          if (value) {
            this.userName = value.username;
            if (
              this.productService.initialParameters.get('productName')?.value !== ""
              && this.productService.initialParameters.get('businessCode')?.value !== ""
              && this.productService.initialParameters.get('insuranceLine')?.value !== ""
            ) {
              this.productService.saveProduct(false);     
            }
            console.log('cerramos la sesión')
            this.signOut();
          }
        })
        .catch((err) => {
          // Usuario no autenticado
        });
      }
    });
  }

  signOut() {
    this.cognitoService.signOut()
    .then((value) => {
      this.dialog.closeAll();
      const dialogRef = this.dialog.open(ModalSessionRestartComponent, {
        data: { userName: this.userName, company: this.company },
        backdropClass: 'backdrop-bg',
        disableClose: true
      });
      dialogRef.afterClosed().subscribe( async(res) => {
        if (!res) {
           this.router.navigate(['/autenticacion']).then().catch();
        }
      });
    })
    .catch((err) => {
      console.log('Ha ocurrido un error al cerrar la sesión')
    });
  }
}
