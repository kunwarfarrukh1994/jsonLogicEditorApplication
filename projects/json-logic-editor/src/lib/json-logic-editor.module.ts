import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { JsonlogicExpressionEditorComponent } from './jsonlogic-expression-editor.component';
import { JsonlogicComponent } from './jsonlogic/jsonlogic.component';



@NgModule({
  declarations: [
    JsonlogicExpressionEditorComponent,
    JsonlogicComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    FormsModule,
    NgSelectModule
  ],
  exports: [
    JsonlogicExpressionEditorComponent
  ],
  providers:[BsDatepickerConfig]
})
export class JsonLogicEditorModule { }
