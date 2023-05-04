import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ModalEditProductService } from '../modal-edit-product/services/modal-edit-product.service';
import { lastValueFrom } from 'rxjs';
import { ModalEditProductComponent } from '../modal-edit-product/modal-edit-product.component';
import { CognitoService } from 'commons-lib';
import { NewProduct } from '../../core/model/NewProduct';
import { ProductService } from '../../services/product.service';
import { ModalAlertComponent } from '../../shared/modal-alert/modal-alert.component';

@Component({
  selector: 'app-modal-create-product',
  templateUrl: './modal-create-product.component.html',
  styleUrls: ['./modal-create-product.component.scss'],
})
export class ModalCreateProductComponent implements OnInit {

  public formData: FormGroup;
  product:boolean= false;
  company = "";
  isAuthenticated!: boolean;
  isLoading = false;

  constructor(public dialog: MatDialogRef<ModalCreateProductComponent>,
     @Inject(MAT_DIALOG_DATA) public data: NewProduct, 
     private formBuilder: FormBuilder, 
     private router: Router, 
     public service: ProductService,
     public modal: MatDialog,
     public initialDataEditProduct: ModalEditProductService,
     private cognitoService: CognitoService) {
    this.formData = this.formBuilder.group(
      {
        name: new FormControl('', [Validators.required, Validators.maxLength(60), Validators.minLength(4), Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ \s]+$')]),
        comercialName: new FormControl('', [Validators.required, Validators.maxLength(200), Validators.minLength(4), Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ \s]+$')]),
        businessCode: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(4), Validators.pattern('^[a-zA-Z0-9_]*[a-zA-Z0-9s][a-zA-Z0-9_]*$')])
      });
  }

  ngOnInit(): void {
      // Data cognito

    this.cognitoService.getUser()
    .then((value) => {
      
      this.company = JSON.parse(value.attributes['custom:sessionInformation']).businessName;
      this.isAuthenticated = true;
     
    })
    .catch(async err => {
      this.isAuthenticated = false;
      await this.cognitoService.signOut().then();
      await this.router.navigate(['login']).then();
    });
      
  }

  /**
   * Evento que cierra el modal..
   */
   onNoClick(): void {
    this.dialog.close();

   
  }

  /**
   * valida y crea el registro inicial del producto
   * @param formValue instancia NewProduct diligenciados del formulario.
   */
  public async createProduct(formValue: NewProduct): Promise<void> {

    
    if (this.formData.valid) {
    
      this.saveProduct(formValue);
     

      if (this.data.name==='copy'){
        this.service.getProduct(this.data.product);
        this.service.initialParameters.get('insuranceLine')?.disable();
        this.service.initialParameters.get('commercialName')?.disable();
        this.service.initialParameters.get('businessCode')?.disable();
        this.service.initialParameters.get('productName')?.setValue(this.formData.controls['name'].value);
        this.service.initialParameters.get('commercialName')?.setValue(this.formData.controls['comercialName'].value);
        this.service.initialParameters.get('businessCode')?.setValue(this.formData.controls['businessCode'].value);
        
      }else {
      this.service.initialParameters.get('productName')?.setValue(this.formData.controls['name'].value);
      this.service.initialParameters.get('commercialName')?.setValue(this.formData.controls['comercialName'].value);
      this.service.initialParameters.get('businessCode')?.setValue(this.formData.controls['businessCode'].value);
      
      
    }
    this.service.initialParameters.get('company')?.setValue(this.company);
    this.onNoClick();
    await this.router.navigate(['productos/parametrizador/parametros-generales']).then();
      
    
    }
  }

   /**
   * Determina si el valor ingresado en campo de la instacia form tiene error de validaci\u00f3n.
   * @param formControlName identificador del input con el valor a validar.
   * @param errorName       identificador del error que se despliega.
   * @returns TRUE si hay error en la validaci\u00f3n, FALSE en caso contrario.
   */
    public hasError(formControlName: string, errorName: string) {
      return this.formData.controls[formControlName].hasError(errorName);
    }
  

  /**
   * valida y crea el registro inicial del producto
   * @param formValue nstancia NewProduct diligenciados del formulario.
   */
  private saveProduct(formValue: NewProduct): void {
    console.log("")
  }

  validProduct= async (formValue: NewProduct)  => {
    this.isLoading = true;
    
    try { 
    
      let res = await lastValueFrom(this.initialDataEditProduct.validProduct('product/existsById', this.formData.controls['name'].value));
      let code = await lastValueFrom(this.initialDataEditProduct.validCode('product/existsByBusinessCode', this.formData.controls['businessCode'].value));
     
       this.product=res
      if (res){
        this.isLoading = false;
        this.modal.open(ModalAlertComponent, {
          data: {
            message:
              'Ya existe un producto con este nombre',
          },
        });

      }else if (code){
        this.isLoading = false;
        this.modal.open(ModalAlertComponent, {
          data: {
            message:
              'El código ya existe',
          },
        });
      }else
      {
       this.isLoading = false;
       this.createProduct(formValue);
      }
        
      
    } catch (error) {
      this.isLoading = false;
      console.log('ocurrio un error:', error);
     
    }
  }

  modalCopy(){

    if (this.data.name==="copy"){
    this.modal.open(ModalEditProductComponent, {
      width: '578px', panelClass: 'modal',
      data: { name: "this.name", trade:" this.trade", processType: "copy" }
    });
  }else {
    this.onNoClick();
  }
}
}
