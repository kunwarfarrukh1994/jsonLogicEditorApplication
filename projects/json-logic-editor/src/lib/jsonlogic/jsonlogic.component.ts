import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerDirective } from 'ngx-bootstrap/datepicker';
import { ICheckExpressionFieldLookUp } from '../interfaces/IJsonEditor';

@Component({
    selector: 'app-jsonlogic',
    templateUrl: './jsonlogic.component.html',
    styleUrls: ['./jsonlogic.component.css']
})
export class JsonlogicComponent implements OnInit {


    @Input() form!: FormGroup ;
    @Input() fieldsList!: ICheckExpressionFieldLookUp[] | null ;
    filtered_fieldsList: ICheckExpressionFieldLookUp[] | null  = [];

    @Input() componentLocation: string| null = null;
    constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) { }
    ngOnInit() {
        this.filtered_fieldsList = this.fieldsList;
    }
    changeToValue(componentForm: FormGroup) {
        componentForm.get('controlType')?.setValue('value');
        componentForm.get('value')?.setValue(null);
        (<FormArray>componentForm.get('parameters')).clear();
        if (this.componentLocation == 'left' && componentForm?.parent?.get('rightComponent') != undefined) {
            componentForm?.parent?.get('fieldtype')?.setValue(null);
        }
    }
    changeToVariable(componentForm: FormGroup) {
        componentForm.get('controlType')?.setValue('variable');
        componentForm.get('value')?.setValue(null);
        (<FormArray>componentForm.get('parameters')).clear();
        if (this.componentLocation == 'left' && componentForm.parent?.get('rightComponent') != undefined) {
            componentForm.parent.get('fieldtype')?.setValue(null);
        }
    }
    changeToFunction(componentForm: FormGroup) {
        componentForm.get('controlType')?.setValue('function');
        componentForm.get('value')?.setValue(null);
        if (this.componentLocation == 'left' && componentForm.parent?.get('rightComponent') != undefined) {
            componentForm.parent.get('fieldtype')?.setValue(null);
        }
    }
    onSelect(componentForm: FormGroup, controlType: string) {
        if (controlType != "variable") {
            let selectedfunction = componentForm.get('value')?.value;
            let func = this.fieldsList!.find(f => f.controlType == "function" && f.value == selectedfunction);
            componentForm.get('returnType')?.setValue(func?.returnType);
            (<FormArray>componentForm.get('parameters')).clear();
            if (func != undefined) {
                func.parameters?.forEach(param => {
                    if (componentForm.get('padding') != undefined) {
                        param.padding = componentForm.get('padding')?.value + 20;
                    }
                    (<FormArray>componentForm.get('parameters')).push(this.componentFormGroup(param));
                });
            }
            if (componentForm.parent?.get('rightComponent') != undefined) {
                componentForm.parent?.get('rightComponent')?.get('type')?.setValue(componentForm.get('returnType')?.value);
                componentForm.parent?.get('fieldtype')?.setValue(componentForm.get('returnType')?.value);
            }
        }
        else {
            let selectedfunction = componentForm.get('value')?.value;
            (<FormArray>componentForm.get('parameters')).clear();
            let func = this.fieldsList!.find(f => f.controlType != "function" && f.value == selectedfunction);
            componentForm.get('type')?.setValue(func?.type);
            if (componentForm.parent?.get('rightComponent') != undefined) {
                componentForm.parent?.get('rightComponent')?.get('type')?.setValue(componentForm.get('type')?.value);
                componentForm.parent.get('fieldtype')?.setValue(componentForm.get('type')?.value);
            }
        }
    }
    componentFormGroup(logic: ICheckExpressionFieldLookUp) {
        let group = this.fb.group({
            type: [logic ? logic.type : null],
            value: [logic ? logic.value : null,Validators.required],
            name: [logic ? logic.name : null],
            label: [logic ? logic.label : null],
            controlType: [logic ? logic.controlType : null,Validators.required],
            returnType: [logic ? logic.returnType : null],
            padding: [logic ? logic.padding : null],
            parameters: this.fb.array([]),
        });
        if (logic.parameters) {
            logic.parameters.forEach(param => {
                (<FormArray>group.get('parameters')).push(this.componentFormGroup(param));
            });
        }
        if(logic)
        {
          if(logic.name)
          {
            let optionsal=logic.name[logic.name.length-1];
            if(optionsal=="?")
            {
              group.get('value')?.setValidators(([]));
              group.get('controlType')?.setValidators(([]));
              group.get('value')?.updateValueAndValidity();
              group.get('controlType')?.updateValueAndValidity();

              console.log(group.get('name')?.value,group.valid);
            }
          }
        }
        return group;
    }

    getPlaceHolder(componentForm: FormGroup) {
        if (componentForm.get('controlType')?.value != 'value') {
            if (componentForm.get('type')?.value == null) {
                return 'Select ' + componentForm.get('controlType')?.value;
            }
            else {
                if (componentForm.get('name')?.value == null) {
                    return 'Select value';
                }
                else {
                    return 'Select ' + componentForm.get('name')?.value;
                }
            }
        }
        else {
            if (componentForm.get('name')?.value == null) {
                return 'Enter value';
            }
            else {
                return 'Enter value for ' + componentForm.get('name')?.value;
            }
        }
    }

    filterlist(componentForm: FormGroup) {
        let controltype = componentForm.get('controlType')?.value;
        let type = componentForm.get('type')?.value;
        if (type != null) {
            if (type != "string" && type != "text") {

                this.filtered_fieldsList = [...this.fieldsList!.filter(x => x.controlType == controltype && (x.returnType == type || x.type == type))];
            }
            else {
                this.filtered_fieldsList = [...this.fieldsList!.filter(x => x.controlType == controltype && (x.returnType == "string" || x.returnType == "text" || x.type == "string" || x.type == "text"))];
            }
        }
        else {
            this.filtered_fieldsList = [...this.fieldsList!.filter(x => x.controlType == controltype)];
        }
        this.cd.detectChanges();
    }

    showValueTypeControl(componentForm: FormControl) {

        if (this.componentLocation != 'right' && componentForm.parent?.get('rightComponent') != undefined) {
            return false;
        }
        else {
            return true;
        }
    }
    disableDateEntry(event: any, datepicker: BsDatepickerDirective) {
        if (event.keyCode == 8) {
            datepicker.bsValue = undefined;
        }
        return false;
    }

    checkerror(control:any)
    {
      if(control.touched && control.errors!=null)
      {
        return true;
      }
      return false;
    }
}
