import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolicyDetailsComponent } from './policy-details.component';
import { DividerModule } from 'primeng/divider';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
@NgModule({
  declarations: [
    PolicyDetailsComponent
  ],
  imports: [
    CommonModule,
    DividerModule,
    InputNumberModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    ProgressSpinnerModule,
    MessageModule,
    MessagesModule,
    ToastModule
  ],
  exports: []
})
export class PolicyDetailsModule { }
