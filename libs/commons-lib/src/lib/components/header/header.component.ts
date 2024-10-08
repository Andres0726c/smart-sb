/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { NavigationEnd, Router } from '@angular/router';
import { CognitoService } from '../../services/cognito.service';

@Component({
  selector: 'refactoring-smartcore-mf-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input('title') title: string = 'SmartCore';

  items!: MenuItem[];
  items2!: MenuItem[];

  userSesion = '';
  rolSesion = '';
  company = '';
  sessionLocation = '';
  isAuthenticated!: boolean;
  closing = false;

  constructor(public router: Router, private cognitoService: CognitoService) {
    this.items2 = [
      {
        icon: 'fas fa-users-cog',
        label: 'Administrar roles',
        routerLink: '/autorizacion/admin'
      },
      {
        icon: 'pi pi-sign-in',
        label: 'Cerrar sesión',
        command: () => {
          this.signOut();
        }
      },
    ];
  }

  async ngOnInit() {
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
          await this.router.navigate(['/autorizacion']).then();
        })
        .catch((err) => {
          console.error('Error al cerrar sesión');
        });
      });
    
    await this.router.events.forEach((event) => {
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
    }).then().catch();
  }

  signOut(){
    this.closing = true;
    this.cognitoService.signOut()
    .then(async () => {
      await this.router.navigate(['/autorizacion']).then().catch();
    })
    .catch((err) => {
      console.error('Error al cerrar sesión');
    });
  }
}
