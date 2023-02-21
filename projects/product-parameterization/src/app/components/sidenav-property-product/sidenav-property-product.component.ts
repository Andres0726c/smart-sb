import { Component, OnInit, ViewChild} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-sidenav-property-product',
  templateUrl: './sidenav-property-product.component.html',
  styleUrls: ['./sidenav-property-product.component.scss']
})
export class SidenavPropertyProductComponent implements OnInit 
{
  productName!:string;
  formProcess!: FormGroup;

  constructor(public dialog: MatDialog, private route: ActivatedRoute, public productService:ProductService, public fb: FormBuilder) { 
    this.formProcess = this.fb.group({
      modification: this.productService.mdfctnPrcss,
      cancellation: this.productService.cancellation,
      rehabilitation: this.productService.rehabilitation,
      renewal: this.productService.renewal
    })
  }

  ngOnInit(): void 
  {
    this.productName = this.productService.initialParameters.get('productName')?.value;    
  }

  @ViewChild('sidenav')
  sidenav!: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = true;

  isExpandedClaim = true;
  showSubmenuClaim: boolean = true;
  

  menus = [
    {
      name: "Emisión",
      showEnable:false,
      show: true,
      isExpanded: true,
      submenus:[
        { name: "Parámetros generales",   routerLink: "parametros-generales"},
        { name: "Datos de la póliza",     routerLink: "datos-poliza"        },
        { name: "Coberturas",             routerLink: "coberturas"          },
        { name: "Planes de servicio",     routerLink: "planes-servicio"     },
        { name: "Tipos de riesgo",        routerLink: "tipos-riesgo"        },
        { name: "Categorías de impuesto", routerLink: "categoria-impuestos" },
        { name: "Control técnico",        routerLink: "control-tecnico"     },
        { name: "Clausulado",             routerLink: "clausula"            },
        { name: "Cúmulos",                routerLink: "cumulos"             },
      ]
    },
    {
      name: "Modificación",
      formGroupName: "modificationControls",
      formControlName: "modification",
      showEnable:true,
      show: false,
      isExpanded: true,
      submenus:[
        { name: "Tipos de modificación",  routerLink: "tipos-modificacion"},
        { name: "Controles técnicos",     routerLink: "control-tecnico-modificacion"},
      ]
    },
    {
      name: "Cancelación",
      formControlName: "cancellation",
      showEnable:true,
      show: false,
      isExpanded: true,
      submenus:[]
    },
    {
      name: "Rehabilitación",
      formControlName: "rehabilitation",
      showEnable:true,
      show: false,
      isExpanded: true,
      submenus:[]
    },
    {
      name: "Renovación",
      formControlName: "renewal",
      showEnable:true,
      show: false,
      isExpanded: true,
      submenus:[]
    },
    {
      name: "Reclamación",
      showEnable:false,
      show: false,
      isExpanded: true,
      submenus:[
        { name: "Concepto de reserva",        routerLink: "reserva-reclamacion"},
        { name: "Concepto de liquidación",    routerLink: "reserva-liquidacion"},
        { name: "Datos de la reclamación",    routerLink: "datos-reclamacion"},
        { name: "Control técnico",            routerLink: "control-tecnico-reclamacion"},
      ]
    },
    
  ]

}