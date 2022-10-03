import { Component, OnInit } from '@angular/core';


interface IdentificationType {
  name: string,
  code: string
}
@Component({
  selector: 'app-filter-policy',
  templateUrl: './filter-policy.component.html',
  styleUrls: ['./filter-policy.component.scss']
})

export class FilterPolicyComponent {

  identificationsType: IdentificationType[];

  selectedIdentificationsType!: IdentificationType;

  constructor() {
    this.identificationsType = [
      {name: 'Cedula de ciudadanida', code: '1'},
      {name: 'Tarjeta de identidad', code: '2'},
      {name: 'Cedula Extranjeria', code: '3'},
      {name: 'Pasaporte', code: '4'},
    ];
  }

}
