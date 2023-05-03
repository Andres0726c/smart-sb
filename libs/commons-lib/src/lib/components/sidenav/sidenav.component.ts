import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'refactoring-smartcore-mf-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  isExpanded: boolean = true;
  items!: MenuItem[];

  constructor() {
    this.items = [
      {
        label: 'Roles',
        expanded: true,
        items: [
            {
              label: 'Administración',
              routerLink: 'administrar-roles'
            },
            {
              label: 'Permisos',
              routerLink: 'admin'
            }
        ]
      }
    ];
  }

  ngOnInit(): void {
  }

}
