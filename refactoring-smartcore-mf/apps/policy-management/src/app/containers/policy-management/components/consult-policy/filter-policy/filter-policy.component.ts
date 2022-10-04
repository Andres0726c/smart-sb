import { Component, OnInit } from '@angular/core';

interface City {
  name: string;
  code: string;
}
@Component({
  selector: 'app-filter-policy',
  templateUrl: './filter-policy.component.html',
  styleUrls: ['./filter-policy.component.scss'],
})
export class FilterPolicyComponent {
  identificationsType: City[];

  selectedIdentificationsType!: City;

  visibleSidebar1 = false;

  constructor() {
    this.identificationsType = [
      { name: 'Cedula de ciudadanida', code: 'CC' },
      { name: 'Tarjeta de identidad', code: 'TI' },
      { name: 'Cedula Extranjeria', code: 'CE' },
      { name: 'Pasaporte', code: 'PS' },
    ];
  }
}
