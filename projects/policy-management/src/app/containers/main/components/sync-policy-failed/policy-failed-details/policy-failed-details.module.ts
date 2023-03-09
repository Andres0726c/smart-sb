import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolicyFailedDetailsComponent } from './policy-failed-details.component';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
@NgModule({
  declarations: [
    PolicyFailedDetailsComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    ProgressSpinnerModule,
    MessagesModule,
    ToastModule,
    TooltipModule
  ],
  exports: []
})
export class PolicyFailedDetailsModule { }
