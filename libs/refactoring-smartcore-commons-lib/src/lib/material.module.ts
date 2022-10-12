import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatBadgeModule } from '@angular/material/badge';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSortModule} from '@angular/material/sort';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {MatTreeModule} from '@angular/material/tree';

@NgModule({
    exports: [
        //BrowserAnimationsModule,
        MatCheckboxModule,
        MatInputModule,
        MatAutocompleteModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatRadioModule,
        MatSelectModule,
        MatMenuModule,
        MatBadgeModule,
        MatStepperModule,
        MatTabsModule,
        MatExpansionModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatChipsModule,
        MatIconModule,
        MatDialogModule,
        MatTableModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatSlideToggleModule,
        MatProgressSpinnerModule,
        MatSidenavModule,
        MatCardModule,
        MatDividerModule,
        MatGridListModule,
        MatNativeDateModule,
        MatSortModule,
        DragDropModule,
        MatTreeModule
    ],
    providers: [
        MatDatepickerModule,
    ]
})

export class AngularMaterialModule { }
