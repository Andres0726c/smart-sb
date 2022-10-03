import { Component, OnInit } from '@angular/core';

interface IdentificationType {
  name: string;
  code: string;
}

@Component({
  selector: 'app-filter-policy-top',
  templateUrl: './filter-policy-top.component.html',
  styleUrls: ['./filter-policy-top.component.scss'],
})
export class FilterPolicyTopComponent {
  identificationsType: IdentificationType[];

  selectedIdentificationsType!: IdentificationType;

  constructor() {
    this.identificationsType = [
      { name: '', code: '' },
      { name: 'Cedula de ciudadanida', code: 'CC' },
      { name: 'Tarjeta de identidad', code: 'TI' },
      { name: 'Cedula Extranjeria', code: 'CE' },
      { name: 'Pasaporte', code: 'PS' },
    ];
  }
}
