import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import {FormBuilder, Validators} from "@angular/forms";
import {SoapService} from "./soap.service";

@Component({
  selector: 'app-hidden-view',
  templateUrl: './hidden-view.component.html',
  styleUrls: ['./hidden-view.component.scss']
})
export class HiddenViewComponent implements OnInit {
  applicationLevel: string = 'Reclamación';

  formuarioMascota = this.formBuilder.group({
    tipoDocumento: ['', Validators.required],
    numeroDocumento: ['', Validators.required],
    tipoMascota: ['', Validators.required],
    razaMascota: ['', Validators.required]
  });

  constructor(
    public productService: ProductService,
    private formBuilder: FormBuilder,
    private soapService: SoapService
  ) {
    this.soapService.sendSOAPMessage()
  }

  ngOnInit(): void {
    //
  }

  onSubmit() {
    console.log(this.formuarioMascota.value)
  }
}
