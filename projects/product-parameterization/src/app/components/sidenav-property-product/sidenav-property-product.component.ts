import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-sidenav-property-product',
  templateUrl: './sidenav-property-product.component.html',
  styleUrls: ['./sidenav-property-product.component.scss'],
})
export class SidenavPropertyProductComponent implements OnInit {
  productName!: string;
  formProcess!: FormGroup;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    public productService: ProductService,
    public fb: FormBuilder
  ) {
    this.formProcess = this.fb.group({
      modification: this.productService.mdfctnPrcss,
      cancellation: this.productService.cnclltnPrcss,
      rehabilitation: this.productService.rnsttmntPrcss,
      renewal: this.productService.rnwlPrcss,
    });
  }

  ngOnInit(): void {
    this.productName =
      this.productService.initialParameters.get('productName')?.value;
  }

  @ViewChild('sidenav')
  sidenav!: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = true;

  isExpandedClaim = true;
  showSubmenuClaim: boolean = true;

  menus = [
    {
      name: 'Emisión',
      showEnable: false,
      show: true,
      isExpanded: true,
      submenus: [
        { name: 'Parámetros generales', routerLink: 'parametros-generales' },
        { name: 'Datos de la póliza', routerLink: 'datos-poliza' },
        { name: 'Coberturas', routerLink: 'coberturas' },
        { name: 'Planes de servicio', routerLink: 'planes-servicio' },
        { name: 'Tipos de riesgo', routerLink: 'tipos-riesgo' },
        { name: 'Categorías de impuesto', routerLink: 'categoria-impuestos' },
        { name: 'Control técnico', routerLink: 'control-tecnico' },
        { name: 'Clausulado', routerLink: 'clausula' },
        { name: 'Cúmulos', routerLink: 'cumulos' },
      ],
    },
    {
      name: 'Modificación',
      formControlName: 'modification',
      showEnable: true,
      show: false,
      isExpanded: true,
      submenus: [
        { name: 'Datos a modificar', routerLink: 'tipos-modificacion' },
        { name: 'Control técnico', routerLink: 'control-tecnico-modificacion' },
      ],
    },
    {
      name: 'Cancelación',
      formControlName: 'cancellation',
      showEnable: true,
      show: false,
      isExpanded: true,
      submenus: [
        { name: 'Datos de cancelación', routerLink: 'datos-cancelacion' },
      ],
    },
    {
      name: 'Rehabilitación',
      formControlName: 'rehabilitation',
      showEnable: true,
      show: false,
      isExpanded: true,
      submenus: [
        { name: 'Datos de rehabilitación', routerLink: 'datos-rehabilitacion' },
      ],
    },
    {
      name: 'Renovación',
      formControlName: 'renewal',
      showEnable: true,
      show: false,
      isExpanded: true,
      submenus: [
        { name: 'Datos de renovación', routerLink: 'datos-renovacion' },
      ],
    },
    {
      name: 'Reclamación',
      showEnable: false,
      show: false,
      isExpanded: true,
      submenus: [
        { name: 'Concepto de reserva', routerLink: 'reserva-reclamacion' },
        { name: 'Concepto de liquidación', routerLink: 'reserva-liquidacion' },
        { name: 'Datos de la reclamación', routerLink: 'datos-reclamacion' },
        { name: 'Control técnico', routerLink: 'control-tecnico-reclamacion' },
      ],
    },
  ];

  validateShow(menu: any) {
    if (menu.formControlName) {
      if (this.formProcess.get(menu.formControlName)?.value.enabled) {
        menu.show = !menu.show;
      }
    } else {
      menu.show = !menu.show;
    }
  }

  clearData(menu: any) {
    console.log(this.formProcess.get(menu));
    if (menu === 'cancellation') {
      if (!this.formProcess?.get(menu)?.value.enabled === false) {
        this.formProcess?.get(menu)?.get('cnclltnCsCd')?.setValue('');
        this.formProcess?.get(menu)?.get('clcltnRl')?.setValue([]);
        this.formProcess?.get(menu)?.get('isCncllblIncptnDt')?.setValue(false);

        this.formProcess?.get(menu)?.get('cnclltnCsCd')?.disable();
        this.formProcess?.get(menu)?.get('isCncllblIncptnDt')?.disable();
      }else{
        this.formProcess?.get(menu)?.get('cnclltnCsCd')?.enable();
        this.formProcess?.get(menu)?.get('isCncllblIncptnDt')?.enable();
      }
    }
    if (menu === 'rehabilitation') {
      if (!this.formProcess.get(menu)?.value.enabled === false) {
        this.formProcess?.get(menu)?.get('rnsttmntCsCd')?.setValue('');
        this.formProcess?.get(menu)?.get('clcltnRl')?.setValue([]);
        this.formProcess?.get(menu)?.get('isNwIssPlcy')?.setValue(false);

        this.formProcess?.get(menu)?.get('rnsttmntCsCd')?.disable();
        this.formProcess?.get(menu)?.get('isNwIssPlcy')?.disable();
      }else{
        this.formProcess?.get(menu)?.get('cnclltnCsCd')?.enable();
        this.formProcess?.get(menu)?.get('isCncllblIncptnDt')?.enable();
      }
    }
  }
}
