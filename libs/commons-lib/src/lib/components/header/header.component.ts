/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { NavigationEnd, Router } from '@angular/router';
import { CognitoService } from '../../services/cognito.service';

@Component({
  selector: 'refactoring-smartcore-mf-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  items!: MenuItem[];
  items2!: MenuItem[];

  userSesion = '';
  rolSesion = '';
  company = '';
  sessionLocation = '';
  isAuthenticated!: boolean;
  closing = false;

  constructor(public router: Router, private cognitoService: CognitoService) {
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        if (this.router.url !== '/inicio') {
          this.sessionLocation = '- Gestión de Póliza';
          this.items = [
            {
              label: 'Inicio',
              icon: 'pi pi-home',
              routerLink: '/',
              visible: true,
            },
          ];
        } else {
          this.sessionLocation = '';
          this.items = [
            {
              label: 'Inicio',
              icon: 'pi pi-home',
              routerLink: '/',
              visible: false,
            },
          ];
        }
      }
    }).then();

    this.items2 = [
      {
        icon: 'pi pi-sign-in',
        label: 'Cerrar sesión',
        command: async() => {
         await this.signOut().then().catch();
        }
      },
    ];
  }
  ngOnInit() {
    this.cognitoService
      .getUser()
      .then((value) => {
        this.company = JSON.parse(value.attributes['custom:sessionInformation']).businessName;
        this.userSesion = value.username;
        this.rolSesion = value.signInUserSession.accessToken.payload['cognito:groups'];
        this.isAuthenticated = true;
      })
      .catch((err) => {
        this.isAuthenticated = false;
        this.cognitoService.signOut()
        .then(async () => {
          await this.router.navigate(['/autenticacion']).then();
        })
        .catch((err) => {
          console.error('Error al cerrar sesión');
        });
      });
  }

  async signOut(){
    this.closing = true;
    await this.cognitoService.signOut()
    .then(async () => {
      await this.router.navigate(['/autenticacion']).then();
    })
    .catch((err) => {
      console.error('Error al cerrar sesión');
    });
  }
}
