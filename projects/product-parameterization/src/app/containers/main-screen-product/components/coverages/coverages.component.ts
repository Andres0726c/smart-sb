import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { ElementTableSearch } from 'projects/product-parameterization/src/app/core/model/ElementTableSearch.model';
import { ModalSearchComponent } from 'projects/product-parameterization/src/app/shared/modal-search/modal-search.component';
import { ProductService } from '../../../../services/product.service';

@Component({
  selector: 'refactoring-smartcore-mf-coverages',
  templateUrl: './coverages.component.html',
  styleUrls: ['./coverages.component.scss'],
  providers: [DialogService],
})
/**
 * Component that handles all child component of coverages
 */
export class CoveragesComponent implements OnInit {
  selectedCoverage: any = new FormGroup({});
  index: number = 0;

  /**
   * Contructor empty
   * @param productService
   * @param dialogService
   * @param fb
   */
  constructor(
    public productService: ProductService,
    public dialogService: DialogService,
    public fb: FormBuilder
  ) {
    //contructor
  }

  /**
   * method that initialize the product coverages
   */
  ngOnInit(): void {
    this.selectedCoverage = this.coverageGroup;
  }

  /**
   * method that change coverage in the tree
   * @param selectedCoverage
   */
  changeCoverage(selectedCoverage: FormGroup) {
    this.selectedCoverage = selectedCoverage;
  }

  /**
   * method that gets product coverages
   */
  get coverageGroup(): FormGroup {
    return this.productService.coverages?.controls[this.index] as FormGroup;
  }

  /**
   * method that opens the coverages modal
   */
  openToAdd() {
    const columns = [
      {
        field: 'name',
        header: 'Nombre',
        displayValue: ['nmName'],
        dbColumnName: ['nmname'],
      },
      {
        field: 'description',
        header: 'Descripción',
        displayValue: ['dsDescription'],
        dbColumnName: ['dsdescription'],
      },
      { field: 'element', displayValue: ['element'] },
    ];

    let parameter =
      this.productService.initialParameters?.get('insuranceLine')?.value !==
      null
        ? this.productService.initialParameters?.get('insuranceLine')?.value +
          ''
        : '0';

    const dialogRef = this.dialogService.open(ModalSearchComponent, {
      data: {
        code: 'coverageDataControls',
        list: this.productService.coverages?.value,
        columns: columns,
        parameter,
      },
      showHeader: false,
      width: '550px',
    });

    dialogRef.onClose.subscribe((res) => {
      if (this.productService.coverages.length == 0) {
        this.addCoverage(res);
        this.index = 0;
        this.selectedCoverage = this.coverageGroup;
      } else {
        this.addCoverage(res);
      }
    });
  }

  /**
   * method that creates the coverages structure in the product
   * @param coverages
   */
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
              quantity: this.fb.control({ value: 0, disabled: true }, [
                Validators.required,
              ]),
              period: this.fb.control({ value: '', disabled: true }, [
                Validators.required,
              ]),
            }),
            events: this.fb.group({
              events: this.fb.control(false),
              quantityEvents: this.fb.control({ value: 0, disabled: true }, [
                Validators.required,
                Validators.min(1),
                Validators.max(999),
              ]),
              periodEvents: this.fb.control({ value: '', disabled: true }, [
                Validators.required,
              ]),
            }),
            clauses: this.fb.array([], Validators.required),
            businessRules: this.fb.group({
              selectionRule: this.fb.control([]),
              initializeRule: this.fb.control([]),
              validateRule: this.fb.control([]),
            }),
            complementaryData: this.fb.array([], Validators.required),
            deductibles: this.fb.array([], Validators.required),
            rates: this.fb.array([], Validators.required),
            payRollData: this.fb.array([], Validators.required),
            claimReservation: this.fb.array([]),
          })
        );
      }
    }
  };
}
