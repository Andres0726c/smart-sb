/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'refactoring-smartcore-mf-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  items!: MenuItem[];
  items2!: MenuItem[];

  userSesion = 'carlos.correa@dreamcodesoft.com';
  rolSesion = 'TLN';
  company = 'Seguros Bolívar';

  constructor() {}

  ngOnInit() {
    this.items = [
      {
        label: 'Inicio',
        icon: 'pi pi-home',
        routerLink: '/'
      },
    ];

    this.items2 = [
      {
        icon: 'pi pi-sign-in',
        label: 'Cerrar sesión',
        routerLink: '/'
      },
    ];
  }
}
