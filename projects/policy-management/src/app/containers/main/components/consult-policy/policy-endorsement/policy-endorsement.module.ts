import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolicyEndorsementComponent } from './policy-endorsement.component';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PolicyEndorsementComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    ProgressSpinnerModule,
    MessagesModule,
    ToastModule,
    TooltipModule,
    TableModule,
    DialogModule,
    FormsModule
  ],
  exports: []
})
export class PolicyEndorsementModule { }