import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { ProductService } from 'projects/policy-management/src/app/core/services/product/product.service';

@Component({
  selector: 'app-modify-tabs-data',
  templateUrl: './modify-tabs-data.component.html',
  styleUrls: ['./modify-tabs-data.component.scss']
})
export class ModifyTabsDataComponent  {

  @Input() modifyData!: FormGroup; //= new FormArray([], [Validators.required]);
  @Input() riskData: any;
  @Input() policyData: any;
  @Input() formData!: FormGroup;
  
  Fields: any;

    items!: any;
    scrollableItems!: MenuItem[];
    activeItem!: MenuItem;
    activeItem2!: MenuItem;
    risk:any=new FormArray([]);
    riskForm!:FormGroup;
    dataRisk:any=[];


  constructor(
    public fb: FormBuilder,
    public productService: ProductService,
  ) { 
    this.riskForm=this.fb.group({
      fields:this.fb.array([])
    });
  }

  
    ngOnInit() {
      
        this.items = [{
          id: 1,
          header: 'Tab 1'
        }, {
          id: 2,
          header: 'Tab 2'
        }];

        console.log(this.modifyData);

       
       // this.scrollableItems = Array.from({ length: 50 }, (_, i) => ({label: `Tab ${i + 1}`}));

    }

  
  ngOnChanges(): void {
   // this.getPolicy(this.riskData.idPolicy);
  // this.riskTypes();
  }

  ngOnAfterViewInit(): void {
   // this.getPolicy(this.riskData.idPolicy);
    //this.riskTypes();
  }

  get riskControls(): FormArray {
    return  this.riskForm?.get('fields') as FormArray;
  }

  get riskDataControls(): FormArray {
    return this.modifyData.get('riskData') as FormArray
  }


  getRiskComplementaryData(risk:any){
    return risk.get('complementaryData') as FormArray
  }


  /**
   *
   * Función para mapear la información en nuevo objeto con los elementos necesarios para enviar al componente html
   */
  
    
}