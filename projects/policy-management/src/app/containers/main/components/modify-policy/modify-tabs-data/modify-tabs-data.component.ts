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
  
    riskTypes(){
      for(let x of this.riskDataControls.value) {

        for (let data of x.complementaryData){
          this.risk.push(this.fb.control(data));
        }
      }
     // this.riskDataControls.clear();
      
      this.getPolicy(this.policyData.idPolicy);
      
      // mapeo de información

      for (let x of this.risk.value){
        let group = this.fb.group({
          id:x.id,
          code: x.code,
          name:x.name,
          fields:this.fb.array([])
        });
        for(let fields of x.fields){
        for(let valueRisk of this.dataRisk){
         
        if (fields.code.businessCode === valueRisk.name){
            let field = this.fb.group({
              businessCode : fields.code.businessCode,
              code: fields.code,
              dataTypeGui:fields.dataTypeGui,
              dataTypeName:fields.dataTypeName,
              dependency:fields.dependency,
              editable:fields.editable,
              id:fields.id,
              initializeRule:fields.initializeRule,
              label:fields.label,
              name:fields.name,
              required:fields.required,
              validateRule:fields.validateRule,
              visible:fields.visible,
              value:valueRisk.value
            });
            (<FormArray>group.get('fields')).push(field)
      
          
         }
         }
       }
       this.riskControls.push(group);
       console.log("auxiliar");
       console.log(this.riskControls);
      }
   
    }

    /**
   *
   * @param id: number, id de la poliza para ser consulta
   
   * Función para ejecutar el ms de obtener los datos de la poliza
    y se mapea la información para obtener el valor de cada elemento
   */

    getPolicy(idpolicy:number){
      this.productService.findByIdPolicy(idpolicy).subscribe((res) => {
        
        let policy = res.body
        for (let objKey of Object.keys(policy.riskPropertiesPolicyData)){
          let nameRiks=policy.riskPropertiesPolicyData[objKey];
          for (let key of Object.keys(nameRiks)){
           if(this.isObject(nameRiks[key])){
            for (let risk of Object.keys(nameRiks[key])){
              for (let dataRisk of Object.keys(nameRiks[key][risk])){
                 let obj ={
                  name:dataRisk,
                  value:nameRiks[key][risk][dataRisk]
                  }
                  const index = this.dataRisk.findIndex((x: { name: any; }) => x.name === obj.name);
                  if (index === -1) {
                    this.dataRisk.push(obj);
                  }
                 
              }
            }
          }
          }
        }
       
       });
       
    }
     /**
   *
   * @param obj, objeto a validar
   
   * Función para ejecutar validar si es objeto
   */

    public isObject(obj: any) {
      return obj !== undefined && obj !== null && obj.constructor == Object;
    }
}