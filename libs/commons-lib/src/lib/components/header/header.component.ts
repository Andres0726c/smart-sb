/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'refactoring-smartcore-mf-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  items!: MenuItem[];
  items2!: MenuItem[];

  userSesion = 'usuario@correo.com';
  rolSesion = 'ROL';
  company = 'Compañía';
  flagUrl = true;

  constructor(public router: Router) {
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        if (this.router.url !== '/') {
          this.items = [
            {
              label: 'Inicio',
              icon: 'pi pi-home',
              routerLink: '/',
              visible: true,
            },
          ];
        } else {
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
    });
  }
  ngOnInit() {
    this.items2 = [
      {
        icon: 'pi pi-sign-in',
        label: 'Cerrar sesión',
        routerLink: '/',
      },
    ];
  }
}
