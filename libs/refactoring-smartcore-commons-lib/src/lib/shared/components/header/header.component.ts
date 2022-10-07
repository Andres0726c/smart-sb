import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'refactoring-smartcore-mf-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  items!: MenuItem[];

  items2!: MenuItem[];

  ngOnInit() {
    this.items = [
      {
        label: 'Inicio',
        icon: 'pi pi-home',
      },
    ];

    this.items2 = [
      {
        icon: 'pi pi-sign-in',
        label: 'Cerrar sesión',
      },
    ];
  }
}
