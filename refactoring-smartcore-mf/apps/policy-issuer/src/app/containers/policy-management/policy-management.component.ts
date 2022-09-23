import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-policy-management',
  template: `<router-outlet></router-outlet>`,
  //styleUrls: ['./policy-management.component.scss']
})
export class PolicyManagementComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
    this.router.navigate(['emisor/consulta']);
  }

}
