import { Component, OnInit } from '@angular/core';

interface City {
  name: string;
  code: string;
}
@Component({
  selector: 'app-consult-policy',
  templateUrl: './consult-policy.component.html',
  styleUrls: ['./consult-policy.component.scss'],
})
export class ConsultPolicyComponent {
  products: any[] = [];

  cols: any[] = [];

  items: any[] = [];

  showCancellationDialog = false;
  selectedPolicy = null;

  constructor() {}

  ngOnInit() {
    this.products = [
      {
        company: 'SEGUROS COMERCIALES BOLIVAR S.A.',
        product: 'product1',
        policyNumber: '1234',
        holder: 'holder',
        startValidity: 'startValidity',
        endValidity: 'endValidity',
      },
      {
        company: 'SEGUROS COMERCIALES BOLIVAR S.A.',
        product: 'product2',
        policyNumber: '2345',
        holder: 'holder',
        startValidity: 'startValidity',
        endValidity: 'endValidity',
      },
      {
        company: 'SEGUROS COMERCIALES BOLIVAR S.A.',
        product: 'product3',
        policyNumber: '4567',
        holder: 'holder',
        startValidity: 'startValidity',
        endValidity: 'endValidity',
      },
    ];

    this.cols = [
      { field: 'product', header: 'Producto' },
      { field: 'policyNumber', header: 'Número de poliza' },
      { field: 'holder', header: 'Tomador' },
      { field: 'startValidity', header: 'Inicio vigencia' },
      { field: 'endValidity', header: 'Fin vigencia' },
      { field: 'actions', header: '' },
    ];

    this.items = [
      { label: 'Modificar', icon: 'pi pi-fw pi-plus', disabled: true },
      {
        label: 'Anular/Cancelar',
        icon: 'pi pi-fw pi-download',
        disabled: false,
        command: (event: any, row: any) => {
          this.showCancellationDialog = true;
          console.log('policy', this.selectedPolicy);
        },
      },
      { label: 'Rehabilitar', icon: 'pi pi-fw pi-refresh', disabled: true },
      { label: 'Renovar', icon: 'pi pi-fw pi-plus', disabled: true },
      { label: 'Ver detalle', icon: 'pi pi-fw pi-download', disabled: true },
    ];
  }

  doSome() {
    console.log('policy', this.selectedPolicy);
  }
}
