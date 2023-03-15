import {
  Component,
  OnInit,
  Input,
  Output,
  ChangeDetectionStrategy,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from 'projects/product-parameterization/src/app/services/product.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ElementReturn } from 'projects/product-parameterization/src/app/core/model/SearchModal.model';
import {
  DataToast,
  STATES,
  ToastMessageComponent,
} from 'projects/product-parameterization/src/app/shared/toast-message/toast-message.component';
import { ModalSearchSmallComponent } from 'projects/product-parameterization/src/app/shared/modal-search-small/modal-search-small.component';

interface options {
  id: number;
  value: [];
}

interface Coverages {
  description: string;
  id: number;
  name: string;
  cvrgDtGrp: any;
  athrzdOprtn: any;
}

@Component({
  selector: 'refactoring-smartcore-mf-commercial-plan-type',
  templateUrl: './commercial-plan-type.component.html',
  styleUrls: ['./commercial-plan-type.component.scss'],
})
export class CommercialPlanTypeComponent implements OnInit, OnChanges {
  @Input() titleBussinesPlan: string = '';
  @Input() data: string = '';
  @Input() bussinesPlans: boolean = false;
  @Input() riskDataCode: string = '';
  dataCoverage: any;
  coverageflag: boolean = false;

  items = [
    { label: 'Mascotas' },
    { label: 'Planes comerciales' },
    { label: this.titleBussinesPlan },
  ];
  tableDataService: any[] = [];
  home = { icon: 'pi pi-home', routerLink: '/' };
  breadcrumb: any;
  showBranch: any[] = [];
  tableData: Coverages[] = [];
  dataAux: any;
  disabled: boolean = true;
  product: any;
  risk: any;
  titleCurrent:string='';
  optionCoverage: any = [];
  idCoverage: number = 0;
  athrzdOprtnCoverages: any[] = [
    { name: 'Remover', key: 'RMV' },
    { name: 'Añadir', key: 'ADD' },
    { name: 'Modificar', key: 'MDF' },
  ];
  athrzdOprtnService: any[] = [
    { name: 'Remover', key: 'RMV' },
    { name: 'Añadir', key: 'ADD' },
  ];

  dataAthrzdOprtn: any = [];

  constructor(
    public productService: ProductService,
    public dialog: MatDialog,
    public fb: FormBuilder,
    public toastMessage: MatSnackBar
  ) {}
  ngOnChanges(changes: SimpleChanges) {
    this.items = [
      { label: 'Mascotas' },
      { label: 'Planes comerciales' },
      { label: this.titleBussinesPlan },
    ];
    this.addDataTable();
    this.tableData = this.tableData.map((d) => {
      // delete athrzdOprtnCopy;
      return {
        ...d,
        athrzdOprtnCopy: d.athrzdOprtn.value,
      };
    });

    this.tableDataService = this.tableDataService.map((d) => {
      // delete athrzdOprtnCopy;
      return {
        ...d,
        athrzdOprtnCopy: d.athrzdOprtn.value,
      };
    });
  }
  ngOnInit(): void {
    // console.log(this.policyDataControls, 'contros');
    // console.log(this.getcoveragesPln(this.data), 'planes');
    // console.log(this.productService.coverages);
    // console.log(
    //   this.getcoveragesPln(this.data).controls.find(
    //     (x: { value: { id: number } }) => x.value.id === 8
    //   )
    // );
    // console.log(this.getcoverages(7).value.cvrgDtGrp.controls)
  }

  getAllFields() {
    let res: any[] = [];
    for (const group of this.getComplementaryData(
      this.idCoverage
    ).getRawValue()) {
      res = res.concat(group.fields);
    }
    return res;
  }

  getAll() {
    let res: any[] = [];
    // console.log(this.idCoverage);

    // console.log(this.getComplementaryData(this.idCoverage).getRawValue());

    // console.log(
    //   this.productService.coverages.controls.find(
    //     (x: { value: { id: number } }) => x.value.id === this.idCoverage
    //   )
    // );
    if (this.idCoverage != 0) {
      for (const group of this.getcoverages(
        this.idCoverage
      ).value.cvrgDtGrp.getRawValue()) {
        res = res.concat(group.fields);
      }
    }

    // console.log(res);
    return res;
  }

  getcmmrclPln(id: number) {
    return <FormArray>(
      this.policyDataControls.controls
        .find((x: { value: { id: number } }) => x.value.id === id)
        ?.get('cmmrclPln')
    );
  }
  getcoveragesPln(code: string) {
    return (<FormArray>this.getcmmrclPln(2)
      .controls.find((x: { value: { code: string } }) => x.value.code === code)
      ?.get('cvrg')) as FormArray;
  }
  getComplementaryData(id: number) {
    return (<FormArray>(
      this.productService.coverages.controls
        .find((x: { value: { id: number } }) => x.value.id === id)
        ?.get('complementaryData')
    )) as FormArray;
  }
  getcoverages(id: number) {
    return (<FormArray>(
      this.getcoveragesPln(this.data).controls.find(
        (x: { value: { id: number } }) => x.value.id === id
      )
    )) as FormArray;
  }
  get cvrgDtGrpDataControls(): FormArray {
    return (<FormArray>(
      this.productService.mdfctnPrcss?.get('mdfcblDt')?.get('rskTyp')?.get('cmmrclPln')?.get('cvrg')
    )) as FormArray;
  }
  get policyDataControls(): FormArray {
    return (<FormArray>(
      this.productService.mdfctnPrcss?.get('mdfcblDt')?.get('rskTyp')
    )) as FormArray;
  }

  getRiskArraydById(id: number) {
    return <FormArray>(
      this.productService.riskTypes.controls
        .find((x: { value: { id: number } }) => x.value.id === 2)
        ?.get('complementaryData')
    );
  }

  getGroupArray(id: number) {
    return <FormArray>this.getcoverages(this.idCoverage)
      .value.cvrgDtGrp.controls.find(
        (x: { value: { id: number } }) => x.value.id === id
      )
      ?.get('fields');
  }
  getCvrgDtGrp(){
  console.log(this.getcoveragesPln(this.data).controls.find((x: { value: { id: number; }; }) => x.value.id=== this.idCoverage));
     return (<FormArray>this.getcoveragesPln(this.data).controls.find((x: { value: { id: number; }; }) => x.value.id=== this.idCoverage)?.value.cvrgDtGrp);
   }
 

  addDataTable() {
    let dataRisk: any = [];
    this.tableData = [];
    this.tableDataService = [];
    dataRisk = this.policyDataControls.value[0].cmmrclPln;

    for (let data of dataRisk) {
      // console.log(data);
      if (data.code == this.data) {
        dataRisk = data;
        // console.log(data.name);
        this.titleBussinesPlan = data.name;
      }
    }

    this.tableData.push(...dataRisk.cvrg);

    this.tableDataService.push(...dataRisk.srvcPln);
  }

  changeCheck(id: any, event: any) {
    let option;
    const data = this.tableData.find((d) => d.id == id);
    // console.log(data);
    if (data) {
      data.athrzdOprtn.setValue(event.checked);
    }
  }

  changeCheckServices(id: any, event: any) {
    const data = this.tableDataService.find((d) => d.id == id);
    if (data) {
      data.athrzdOprtn.value = event.checked;
    }
  }

  activeButton(data: any) {
    let btn: boolean,
      result = data.athrzdOprtn.value;
    result = result.find((d: any) => d === 'MDF');
    result ? (btn = false) : (btn = true);
    return btn;
  }

  openToAdd() {
    const columns = [
      { name: 'name', header: 'Nombre', displayValue: ['label'] },
      {
        name: 'description',
        header: 'Descripción',
        displayValue: ['description'],
      },
      { name: 'shouldDelete', displayValue: [true] },
      { name: 'element', displayValue: ['element'] },
    ];

    const dialogRef = this.dialog.open(ModalSearchSmallComponent, {
      id: 'emissionData',
      data: {
        code: 'emissionData',
        columns: columns,
        list: this.getAll(),
        data: this.getAllFields(),
      },
    });
    dialogRef.afterClosed().subscribe((res: ElementReturn[]) => {
      this.addItem(res, 1, true);
    });
  }
  addItem = (obj: ElementReturn[], group: number, showMessage: boolean) => {
    if (obj) {
      this.showMessageGroup(showMessage);
      let nameGruop: any;

      for (let object of obj) {
        nameGruop = this.getNameGroup(object.element.businessCode);
        this.add(nameGruop)
        this.addGroupArray(object, nameGruop);
      }
    }
  };
add(nameGroup:any){
  if(this.getcoverages(this.idCoverage).value.cvrgDtGrp.value.findIndex(
    (x: { id: any }) => x.id === nameGroup.id) === -1)
    console.log(this.getCvrgDtGrp());
    this.getCvrgDtGrp().push(
      new FormGroup({
        id: this.fb.control(nameGroup.id),
        code: this.fb.control(nameGroup.code),
        name: this.fb.control(nameGroup.name),
        fields: this.fb.array([], Validators.required),
        isEditing: this.fb.control(nameGroup.isEditing),
      })
    )
    // this.getcoverages(this.idCoverage).value.cvrgDtGrp)
}
  addGroupArray(object: any, nameGruop: any) {
    let coverage = this.getcoverages(this.idCoverage).value.cvrgDtGrp.value;

    const index = coverage.findIndex((x: { id: any }) => x.id === nameGruop.id);
    console.log("object: ",object);
    console.log(coverage);
    console.log("nameGruop: ",nameGruop)
    console.log("index: ",index)
    this.getGroupArray(index + 1).push(
      new FormGroup({
        id: this.fb.control(object.id, [Validators.required]),
        name: this.fb.control(object.name, [Validators.required]),
        label: this.fb.control(
          object.element.nmLabel
            ? object.element.nmLabel
            : object.element.label,
          [Validators.required]
        ),
        dataType: this.fb.control(object.element.dataType),
        initializeRule: this.fb.array([], []),
        validateRule: this.fb.array([], []),
        dependency: this.fb.control(null, []),
        requiredEssential: this.fb.control(
          object.element.flIsMandatory === 'S' ? true : false,
          [Validators.required]
        ),
        required: this.fb.control(
          object.element.flIsMandatory === 'S' ? true : false,
          [Validators.required]
        ),
        editable: this.fb.control(true, [Validators.required]),
        visible: this.fb.control(true, [Validators.required]),
        fieldGroup: this.fb.control(index + 1, []),
        shouldDelete: this.fb.control(object.shouldDelete, [
          Validators.required,
        ]),
        businessCode: this.fb.control(object.element.businessCode),
        domainList: this.fb.control(object.element.domainList),
      })
    );
    console.log(this.productService.mdfctnPrcss);
  }
  showMessageGroup(showMessage: boolean) {
    let data: DataToast = {
      status: STATES.success,
      title: 'Asociación exitosa',
      msg: 'Los datos de la póliza fueron asociados correctamente.',
    };
    if (showMessage) {
      this.toastMessage.openFromComponent(ToastMessageComponent, {
        data: data,
      });
    }
  }

  getNameGroup(name: any) {
    let objGruop;
    // console.log(this.productService.policyData.value);
    // console.log(name);
    // console.log(this.getComplementaryData(this.idCoverage).value);
    for (let groups of this.getComplementaryData(this.idCoverage).value) {
      for (let key of groups.fields) {
        if (key.businessCode === name) {
          objGruop = {
            id: groups.id,
            code: groups.code,
            name: groups.name,
            fields: this.fb.array([], Validators.required),
            isEditing: groups.isEditing,
          };
          break;
        }
      }
    }
    console.log(objGruop);
    return objGruop;
  }



  editData(data: any) {
    console.log(data, 'editar');

    if (data) {
      this.idCoverage = data.id;
      this.titleCurrent=data.name;
      this.coverageflag = true;
    } else {
      this.coverageflag = false;
    }
    // console.log(this.getcoveragesPln(this.data));
    // console.log(this.getcoverages(data.id), 'aqui');
    // console.log(data);
    // console.log(this.policyDataControls);
  }

  sendDataCoverage() {
    // console.log(this.getcoverages(this.idCoverage).value.cvrgDtGrp);
    return this.getcoverages(this.idCoverage).value.cvrgDtGrp;
  }
}
