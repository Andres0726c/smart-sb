import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolicyDetailsComponent } from './policy-details.component';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
@NgModule({
  declarations: [
    PolicyDetailsComponent
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
export class PolicyDetailsModule { }
