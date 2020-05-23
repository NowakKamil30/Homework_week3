import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarPageComponent } from './car-page/car-page.component';
import { MaterialModule } from '../material/material.module';
import { TableComponent } from './table/table.component';
import { ModalComponent } from './modal/modal.component';
import { ReactiveFormsModule} from '@angular/forms';
import { SearchInputComponent } from './search-input/search-input.component';




@NgModule({
  declarations: [
    CarPageComponent,
    TableComponent,
    ModalComponent,
    SearchInputComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,

  ],
  exports: [
    CarPageComponent,
    ModalComponent
  ]
})
export class CarPageModule { }
