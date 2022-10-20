import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialExampleComponent } from './material-example.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [MaterialExampleComponent],
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports: [MaterialExampleComponent],
})
export class MaterialExampleModule {}
