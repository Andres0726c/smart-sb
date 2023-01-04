import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ElementTableSearch } from '../../core/model/ElementTableSearch.model';
import {
  DataToast,
  ToastMessageComponent,
  STATES,
} from '../../shared/toast-message/toast-message.component';
import { ClausesComponent } from '../../shared/clauses/clauses.component';
import { ComplementaryDataComponent } from '../../shared/complementary-data/complementary-data.component';
import { DeductiblesComponent } from './deductibles/deductibles.component';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../../services/product.service';
import { ModalSearchSmallComponent } from '../../shared/modal-search-small/modal-search-small.component';

@Component({
  selector: 'app-coverages',
  templateUrl: './coverages.component.html',
  styleUrls: ['./coverages.component.scss'],
})
/**
 * Render the coverage section composed of complementary data, pay roll, clauses, deductibles, rates and business rules
 */
export class CoveragesComponent implements OnInit {

  @ViewChild('complementaryDataComponent') complementaryDataComponent!: ComplementaryDataComponent;
  @ViewChild('payRollDataComponent') payRollDataComponent!: ComplementaryDataComponent;
  @ViewChild(ClausesComponent) clauseComponent!: ClausesComponent;
  @ViewChild(DeductiblesComponent) deductibleComponent!: DeductiblesComponent;

  selectedCoverage:any = new FormGroup({});
  index: number = 0;

  dataSourcetable = new MatTableDataSource<any>();

  constructor(
    public dialog: MatDialog,
    public productService: ProductService,
    private toastMessage: MatSnackBar,
    public fb: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.selectedCoverage = this.coverageGroup;
  }

  changeCoverage(selectedCoverage: FormGroup){
    this.selectedCoverage = selectedCoverage;
    this.dataSourcetable = new MatTableDataSource<any>((<FormArray>this.selectedCoverage.get('claimReservation')).controls);
    if (this.complementaryDataComponent) { this.complementaryDataComponent.reset() }
    if (this.payRollDataComponent) { this.payRollDataComponent.reset() }
    //this.dataSourcetable.paginator = this.paginatorClaim;
  }

  get coverageGroup(): FormGroup {
    return this.productService.coverages?.controls[this.index] as FormGroup;
  }

  openToAdd(): void {

    const columns = [
      { name: 'name', header: 'Nombre', displayValue: ['nmName'], dbColumnName:['nmname']  },
      { name: 'description', header: 'Descripción', displayValue: ['dsDescription'], dbColumnName:['dsdescription'] },
      { name: 'element', displayValue: ['element'] },
    ];

    let parameter =
      this.productService.initialParameters?.get('insuranceLine')?.value !== null
        ? this.productService.initialParameters?.get('insuranceLine')?.value + ''
        : '0';
    const dialogRef = this.dialog.open(ModalSearchSmallComponent, {
      data: {
        code: 'coverageDataControls',
        columns:columns,
        list: this.productService.coverages?.value,
        parameter,
      },
      panelClass: 'custom-dialog-container',
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (this.productService.coverages.length == 0) {
        this.addCoverage(res);
        this.index = 0;
        this.selectedCoverage = this.coverageGroup;
      } else {
        this.addCoverage(res);
      }
    });
  }

  addCoverage = (coverages: ElementTableSearch[]): void => {
    if (coverages) {
      for (let coverage of coverages) {
        this.productService.coverages.push(
          this.fb.group({
            id: this.fb.control(coverage.id, Validators.required),
            name: this.fb.control(coverage.name, Validators.required),
            description: this.fb.control(
              coverage.description,
              Validators.required
            ),
            waitingTime: this.fb.group({
              waitingTime: this.fb.control(false),
              quantity: this.fb.control({value:0, disabled: true,},[Validators.required]),
              period: this.fb.control({value:'', disabled: true},[Validators.required])
            }),
            events: this.fb.group({
              events: this.fb.control(false),
              quantityEvents: this.fb.control({value:0, disabled: true},[Validators.required, Validators.min(1), Validators.max(999)]),
              periodEvents: this.fb.control({value:'', disabled: true},[Validators.required])
            }),
            clauses: this.fb.array([], Validators.required),
            businessRules: this.fb.group({
              selectionRule: this.fb.array([]),
              initializeRule: this.fb.array([]),
              validateRule: this.fb.array([]),
            }),
            complementaryData: this.fb.array([], Validators.required),
            deductibles: this.fb.array([], Validators.required),
            rates: this.fb.array([], Validators.required),
            payRollData: this.fb.array([], Validators.required),
            claimReservation: this.fb.array([]),
          })
        );
      }
      let dataToast: DataToast = {
        status: STATES.success,
        title: 'Asociación exitosa',
        msg: 'Las coberturas fueron asociadas correctamente',
      };
      this.toastMessage.openFromComponent(ToastMessageComponent, {
        data: dataToast,
      });
    }
  };

}
