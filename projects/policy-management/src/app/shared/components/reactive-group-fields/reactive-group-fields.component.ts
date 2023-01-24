import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ElementTableSearch } from 'projects/product-parameterization/src/app/core/model/ElementTableSearch.model';
import { ProductService } from '../../../core/services/product/product.service';
import { ModalResponseRulesComponent } from '../modal-response-rules/modal-response-rules.component';

@Component({
  selector: 'smartcore-reactive-group-fields',
  templateUrl: './reactive-group-fields.component.html',
  styleUrls: ['./reactive-group-fields.component.scss']
})
export class ReactiveGroupFieldsComponent {
  @Input() group: any = new FormGroup({});
  @Input() policy: any;
  @Input() level: any;
  //@Input() validRule: boolean=true;
  @Output() updatePolicy: EventEmitter<any> = new EventEmitter();
  @Output() validRules: EventEmitter<any> = new EventEmitter();

  validRule:boolean=true;

  constructor(
    public fb : FormBuilder,
    public dialogService: DialogService,
    public messageService: MessageService,
    public productService: ProductService
  ) {}

  ngOnInit() {
   // TODO document why this method 'ngOnInit' is empty
  }

  getFieldsControls(group: any) {
    return group.get('fields') as FormArray;
  }

  executeRule(field:any,groupName:any,show:boolean) {

     let valueAfter ="";//this.level==='risk'?this.policy.plcy.rsk['1']?.rskDtGrp[groupName?.value.code][field.value.businessCode]
  //   :this.policy.plcy?.plcyDtGrp[groupName.value?.code][field.value?.businessCode];

  //  let valueCurrent =!this.isObject(field.value.value)?field.value.value:field.value.value.id;

  //   valueAfter = !this.isObject(valueAfter)?valueAfter:valueAfter.id

  //    console.log(valueCurrent,"actual");
  //    console.log(valueAfter,"despues");
  //    console.log(field.value,"field");

  //   if (valueCurrent !== valueAfter || show) {

  //     this.updatePolicy.emit(false);
      
  //     this.validRules.emit(true);

  //     this.addControls(field);

  //      field.addControl("rule", this.fb.control(false));
      

  //     let levelField:any= [];

  //     if(field.value?.initializeRule?.length !== 0 && valueCurrent !==''){

  //       levelField= [];

  //       let obj = {
  //         policyIssueRequestDTO:this.policy,
  //         rule:field.value?.initializeRule?field.value?.initializeRule[0]:"",
  //         ruleIssue:this.level==='risk'?this.policy.plcy.rsk['1'].rskDtGrp:this.policy.plcy.plcyDtGrp,
  //         keysContextVariables:levelField
  //       }

  //       this.productService.executeRule(obj).subscribe((res: any) => {

  //         let errorRule = res.body;
  //         if(res.body ===''){
  //           errorRule = res.dataHeader!.errorList[0].errorDescription!;
  //         }
  //       });
  //     }
  //     if(field.value?.validateRule.length !== 0){

  //       console.log("entra validation");

  //       levelField= [];
  //       let obj = {
  //         policyIssueRequestDTO:this.policy,
  //         rule:field.value?.validateRule[0],
  //         ruleIssue:this.level==='risk'?this.policy.plcy.rsk['1'].rskDtGrp:this.policy.plcy.plcyDtGrp,
  //         keysContextVariables:levelField
  //       }

  //       this.productService.executeRule(obj).subscribe((res: any) => {

  //         let errorRule = res.body;
  //         if(res.body ===''){
            
  //           field.value.rule = true;

  //           console.log (field);
  //           this.validRules.emit(false);
  //           errorRule = res.dataHeader!.errorList[0].errorDescription!;

  //         }

  //         if(show)
  //         this.showModal("Regla de validación",field.value.validateRule[0],errorRule);

  //       });

  //     }

  //   }

  }

  public isObject(obj: any) {
    return obj !== undefined && obj !== null && obj.constructor == Object;
  }

  addControls(field:any){
    field.addControl("rule", this.fb.control(false));
  }


  valid(){
    console.log("llega");
  }


  showModal(title:any,field:any, message: string) {
    const ref = this.dialogService.open(ModalResponseRulesComponent, {
      data: {
        title: title,
        field:field,
        message: message,
      },
      header: title,
      modal: true,
      dismissableMask: true,
      width: '60%',
      contentStyle: { 'max-height': '600px', overflow: 'auto' },
      baseZIndex: 10000,
    });

    ref.onClose.subscribe((res: boolean) => {

    });
  }



}
