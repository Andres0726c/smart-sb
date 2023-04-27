import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'refactoring-smartcore-mf-auth-management',
  templateUrl: './auth-management.component.html',
  styleUrls: ['./auth-management.component.scss']
})
export class AuthManagementComponent implements OnInit {
  items!: MenuItem[];

  constructor() { 
    this.items = [
      {
        label: 'Roles',
        expanded: true,
        items: [
            {
              label: 'Administración',
              routerLink: 'admin'
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
