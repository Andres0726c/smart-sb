import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengExampleComponent } from './primeng-example.component';
import {ButtonModule} from 'primeng/button';

@NgModule({
  declarations: [PrimengExampleComponent],
  imports: [
    CommonModule,
    ButtonModule
  ],
  exports: [PrimengExampleComponent],
})
export class PrimengExampleModule {}
