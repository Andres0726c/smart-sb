import { Component, OnInit, ViewChild, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ModalConfirmDeleteComponent } from '../../shared/modal-confirm-delete/modal-confirm-delete.component';
import { AnyARecord } from 'dns';
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

    public fb: FormBuilder,
    private router: Router
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

    // Se establecen los valores para mostrar el menu por defecto
    this.setDefaultOpenMenus();
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
      name: 'Previsualización campos',
      showEnable: false,
      show: true,
      isExpanded: true,
      submenus: [
        { name: 'Datos de póliza', routerLink: 'previsualizar-datos-poliza' },
        { name: 'Datos de riesgo' },
        { name: 'Datos de cobertura' },
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

  changeCheck(menu: any, moduleType: any) {
    if (menu.formControlName) {
      if (this.formProcess.get(menu.formControlName)?.value.enabled) {
        if (moduleType === 'modification') {
          this.showMessage(menu);
        }
      } else {
        menu.show = true;
      }
    } else {
      menu.show = false;
    }
  }

  showMessage(menu: any) {
    const dialogRef = this.dialog.open(ModalConfirmDeleteComponent, {
      data: {
        img: 'picto-delete',
        message: `Se perderá la parametrización de ${menu.name.toLowerCase()} realizada, ¿desea continuar?`,
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.setValues(menu, false);
        this.deleteCascade();
      } else {
        this.setValues(menu, true);
      }
    });

    dialogRef.beforeClosed().subscribe(async (res) => {
      if (res) await this.navigateGeneralParams().then(result => {}).catch(error => {});
    });
  }

  async navigateGeneralParams() {
    await this.router.navigate([
      '/productos/parametrizador/parametros-generales',
    ]);
  }
  setValues(menu: any, value: boolean) {
    this.formProcess.get(menu.formControlName)?.get('enabled')?.setValue(value);

    menu.show = this.formProcess
      .get(menu.formControlName)
      ?.get('enabled')?.value;
  }

  // Obtiene el FormArray

  getComplementaryDataControls(): FormArray {
    return <FormArray>(
      this.productService.mdfctnPrcss?.get('mdfcblDt')?.get('plcyDtGrp')
    );
  }

  getRiskType(): FormArray {
    return <FormArray>(
      this.productService.mdfctnPrcss?.get('mdfcblDt')?.get('rskTyp')
    );
  }

  getRiskTypeCmmrclPln(control: any): FormArray {
    return <FormArray>control?.get('cmmrclPln');
  }



  getMdfctnTchnclCntrl(): FormArray {
    return <FormArray>this.productService.mdfctnPrcss?.get('mdfctnTchnclCntrl');
  }

  deleteCascade() {
      while (this.getComplementaryDataControls().length !== 0) {
        this.getComplementaryDataControls().removeAt(0);
      }

      while (this.getMdfctnTchnclCntrl().length !== 0) {
        this.getMdfctnTchnclCntrl().removeAt(0);
      }

      for (let i = 0; i < this.getRiskType().length; i++) {
        const control = this.getRiskType().at(i);
        this.deleteDataModification(control);
      }
    
  }

  deleteAthrzdOprtn(formArray: FormArray,type:string){
    if(type==='athrzdOprtn'){
        while (formArray.length !== 0) {
          formArray.removeAt(0);
        }
      }else{
        for (let i = 0; i < formArray.length; i++) {
          let athrzdOprtn: FormArray = formArray.at(i).get('athrzdOprtn') as FormArray, cvrgDtGrp: FormArray = formArray.at(i).get('cvrgDtGrp') as FormArray;  
          this.deleteAthrzdOprtn(athrzdOprtn,'athrzdOprtn');
          if(cvrgDtGrp)
          this.deleteAthrzdOprtn(cvrgDtGrp,'athrzdOprtn');
        }
      }
  }

  deleteDataModification(control: any) {
    let cmmrclPln = this.getRiskTypeCmmrclPln(control), i = 0;
    if (cmmrclPln) {
      while (cmmrclPln.length != i) {
        let cmmrclPln: FormArray = control.get('cmmrclPln') as FormArray,rskTypDtGrp: FormArray = control.get('rskTypDtGrp') as FormArray;
        this.deleteAthrzdOprtn(rskTypDtGrp,'athrzdOprtn');
        this.deleteCvrgModify(cmmrclPln);
        i++;
      }
    }
  }

  deleteCvrgModify(cmmrclPln:any){
    for (let i = 0; i < cmmrclPln.length; i++) {
      let cvrg: FormArray = cmmrclPln.at(i).get('cvrg') as FormArray, srvcPln: FormArray = cmmrclPln.at(i).get('srvcPln') as FormArray, athrzdOprtn: FormArray = cmmrclPln.at(i).get('athrzdOprtn') as FormArray; 
      this.deleteAthrzdOprtn(athrzdOprtn,'athrzdOprtn');
      this.deleteAthrzdOprtn(cvrg,'');
      this.deleteAthrzdOprtn(srvcPln,'');
    }
  }
  setDefaultOpenMenus() {
    this.menus.forEach((menu) => {
      menu.show =
        menu.showEnable && menu.formControlName
          ? this.formProcess?.get(menu.formControlName)?.value.enabled
          : menu.show;
    });
  }

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
    if (menu === 'cancellation') {
      if (!this.formProcess?.get(menu)?.value.enabled === false) {
        this.formProcess?.get(menu)?.get('cnclltnCsCd')?.setValue([]);
        this.formProcess?.get(menu)?.get('clcltnRl')?.setValue([]);
        this.formProcess?.get(menu)?.get('isCncllblIncptnDt')?.setValue(false);

        this.formProcess?.get(menu)?.get('cnclltnCsCd')?.disable();
        this.formProcess?.get(menu)?.get('isCncllblIncptnDt')?.disable();
      } else {
        this.formProcess?.get(menu)?.get('cnclltnCsCd')?.enable();
        this.formProcess?.get(menu)?.get('isCncllblIncptnDt')?.enable();
      }
    }
    if (menu === 'rehabilitation') {
      if (!this.formProcess.get(menu)?.value.enabled === false) {
        this.formProcess?.get(menu)?.get('rnsttmntCsCd')?.setValue([]);
        this.formProcess?.get(menu)?.get('clcltnRl')?.setValue([]);
        this.formProcess?.get(menu)?.get('isNwIssPlcy')?.setValue(false);

        this.formProcess?.get(menu)?.get('rnsttmntCsCd')?.disable();
        this.formProcess?.get(menu)?.get('isNwIssPlcy')?.disable();
      } else {
        this.formProcess?.get(menu)?.get('rnsttmntCsCd')?.enable();
        this.formProcess?.get(menu)?.get('isNwIssPlcy')?.enable();
      }
    }

    if (menu === 'renewal') {
      if (!this.formProcess.get(menu)?.value.enabled === false) {
        this.formProcess?.get(menu)?.get('rnwlCsCd')?.setValue([]);
        this.formProcess?.get(menu)?.get('clcltnRl')?.setValue([]);
        this.formProcess?.get(menu)?.get('isNwIssPlcy')?.setValue(false);

        this.formProcess?.get(menu)?.get('rnwlCsCd')?.disable();
        this.formProcess?.get(menu)?.get('clcltnRl')?.disable();
        this.formProcess?.get(menu)?.get('isNwIssPlcy')?.disable();
      } else {
        this.formProcess?.get(menu)?.get('rnwlCsCd')?.enable();
        this.formProcess?.get(menu)?.get('clcltnRl')?.enable();
        this.formProcess?.get(menu)?.get('isNwIssPlcy')?.enable();
      }
    }
  }
}
