import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ICheckExpressionFieldLookUp, ICheckListExpression, ICustomJsonLogicComponent } from './interfaces/IJsonEditor';

@Component({
    selector: 'jsonlogic-expression-editor',
    templateUrl: './jsonlogic-expression-editor.component.html',
    styleUrls: ['./jsonlogic-expression-editor.component.css']
})
export class JsonlogicExpressionEditorComponent implements OnInit,AfterViewInit {



    @Input() jsonLogic: string | undefined;
    @Input() variables: ICheckExpressionFieldLookUp[] =[];
    @Input() functions: ICheckExpressionFieldLookUp[] =[];
    plus="https://www.clipartmax.com/png/middle/79-791760_plus-addition-sign-circle-vector-1-icon-png.png";
    minus="https://icons-for-free.com/download-icon-minus-131964784904142604_512.png";
    JSON_LOGIC: String| undefined;
    JsonLogicObj:any={};
    checklistTemplateItemExpressions: ICheckListExpression[] = [];
    filtered_operatorList = [] as any;
    operatorList = [
        {
            type: ['number', 'text', 'string', 'date'],
            label: 'Equals',
            value: '=='
        },
        {
            type: ['number', 'date'],
            label: 'Not Equal',
            value: '!='
        },
        {
            type: ['number', 'date'],
            label: 'Greator Then',
            value: '>'
        },
        {
            type: ['number', 'date'],
            label: 'Less Then',
            value: '<'
        },
        {
            type: ['number', 'date'],
            label: 'Greator Then Equals',
            value: '>='
        },
        {
            type: ['number', 'date'],
            label: 'Less Then Equals',
            value: '<='
        },
        {
            type: ['text', 'string'],
            label: 'In',
            value: 'in'
        }
    ];
    expressionformArray: FormArray = this.fb.array([]);
    logicalOperatorList = [
        {
            label: 'And',
            value: 1
        },
        {
            label: 'Or',
            value: 0
        }
    ]
    constructor(private fb: FormBuilder) {
     }
  ngAfterViewInit() {
  }
    ngOnInit() {
        this.filtered_operatorList = this.operatorList;
        this.constructModelLogic();
        //this.constructFormArray();

    }


    mergeFunctionIntoVariables() {
        this.functions!.forEach(f => {
            f.label = 'f(X) ' + f.name;
            f.value = f.name;
          this.variables.push(f);
        });
    }
    constructModelLogic() {
        // let json_logic = `{"and":[{"==":[{"var":"Name"},{"cat":["farrukh ","khan"]}]}]}`;
        // let json_logic = `{"and":[{"==":[{"cat":["farrukh ","khan"]},{"var":"Name"}]}]}`;
        //let json_logic = `{"and":[{"in":[{"var":"SubjectLastName"},{"var":"ParentSubjectName"}]},{"and":[{"==":[{"var":"Name"},{"cat":["farrukh ","khan"]}]}]}]}`;
        this.mergeFunctionIntoVariables();
        if (this.jsonLogic != null && this.jsonLogic != '') {
            let jsonlogicObj = JSON.parse(this.jsonLogic);
            let modelLogic = {} as ICheckListExpression;
            this.expressionformArray.clear();
            this.checklistTemplateItemExpressions = [];
            this.checklistTemplateItemExpressions.push(this.parseJsonLogic(jsonlogicObj, modelLogic));
            this.constructFormArray();
            sessionStorage.setItem("model_LOGIC", JSON.stringify(modelLogic));
        }
        else {
            let exp = {} as ICheckListExpression;
            exp.id = 0;
            exp.leftComponent = null;
            exp.rightComponent = null;
            exp.logicalOperator = 1;
            exp.field = null;
            exp.transactionType = 1;
            exp.operator = null;
            exp.value = null;
            this.expressionformArray.push(this.add_checkExpressionFormGroup(exp));
        }
    }

    parseJsonLogic(Jobj: any, logic: ICheckListExpression) {
        let keys = Object.keys(Jobj);
        let key = keys[0];
        if (key == "and" || key == "or") {
            logic.logicalOperator = this.getLogicalOperatorValue(key);
            // and: []
            Object.keys(Jobj[key]).forEach((k, i) => {
                let keys = Object.keys(Jobj[key][k]); //   JObj["and"]["0"]  ==  {  "==":[      ]     }
                let operatorkey = keys[0];
                //  Jobj[key][k][operatorkey]=    [   {"var":"Name"},   {"cat":["farrukh ","khan"]}    ]
                // Jobj[and][0][==]            =[   {"var":"Name"},   {"cat":["farrukh ","khan"]}    ]
                if (operatorkey == "and" || operatorkey == "or") {
                    let sublogic = {} as ICheckListExpression;
                    sublogic.operator = Object.keys(Jobj[key][i][operatorkey][0])[0];
                    this.checklistTemplateItemExpressions.push(this.parseJsonLogic(Jobj[key][i], sublogic));
                }
                else {
                    logic.operator = operatorkey;
                    Jobj[key][k][operatorkey].forEach((obj:any, i:number) => {
                        if (i == 0) {
                            logic.leftComponent = {} as ICustomJsonLogicComponent;
                            logic.leftComponent = this.parseComponentLogic(obj, logic.leftComponent);
                            if (logic.leftComponent.type == "text" || logic.leftComponent.type == "string" || logic.leftComponent.returnType == "text" || logic.leftComponent.returnType == "string") {
                                logic.fieldType = "string";
                            }
                            else {
                                if (logic.leftComponent.type != null) {
                                    logic.fieldType = logic.leftComponent.type;
                                }
                                else {
                                    logic.fieldType = logic.leftComponent.returnType;
                                }
                            }
                        }
                        if (i == 1) {
                            logic.rightComponent = {} as ICustomJsonLogicComponent;
                            logic.rightComponent = this.parseComponentLogic(obj, logic.rightComponent);
                            logic.rightComponent.type = logic.fieldType;
                        }
                    });
                }
            });
        }
        // if (key == "var") {

        // }
        // if (this.operatorList.find(op => op.value == key) != undefined) {
        // }
        // else {

        // }

        return logic;
    }

    parseComponentLogic(Jobj: any, component: ICustomJsonLogicComponent, name: string| null | undefined = null, padding: number = 20) {

      if(Jobj==null)
      {
        component.controlType = null;
        component.value = Jobj;
        component.padding = padding;
        component.returnType = null;
        component.label = null;
        component.name = name;
        component.parameters = [];
        return component;
      }
      let keys = Object.keys(Jobj);
        let key:any = null;
        if (keys.length) {
            key = keys[0];
        }
        if (typeof (Jobj) == 'string') {
            // its a string   control type value
            if (this.IsISODate(Jobj)) {
                component.type = 'date';
            }
            else if (isNaN(Number(Jobj)) == false) {
                component.type = 'number';
            }
            else {
                component.type = 'string';
            }
            component.controlType = "value";
            component.value = Jobj;
            component.padding = padding;
            component.returnType = null;
            component.label = null;
            component.name = name;
            component.parameters = [];
        }

        else if (key == "var") {
            // its a variable  control type  variable
            let chosenVar = this.variables!.find(x => x.value == Jobj[key]);
            component.type = chosenVar!.type;
            component.value = chosenVar!.value;
            component.label = null;
            component.name = name;
            component.returnType = null;
            component.controlType = "variable";
            component.padding = padding;
            component.parameters = [];
        }
        else if (key != 'var') {
            let chosenFunc = this.variables!.find(x => x.value == key) as ICheckExpressionFieldLookUp;
            component.type = null;//chosenFunc.type;
            component.value = chosenFunc!.value;
            component.label = null;
            component.name = name ? name : chosenFunc.name;
            component.returnType = chosenFunc.returnType;
            component.controlType = "function";
            component.padding = padding;
            component.parameters = [];
            Jobj[key].forEach((obj:any, i:number) => {
                let param = {} as ICustomJsonLogicComponent;
                let padding = component.padding + 20;
                component.parameters?.push(this.parseComponentLogic(obj, param, chosenFunc?.parameters![i].name, padding));
            });
            // its a function
        }
        return component;
    }



    constructFormArray() {
      debugger;
        this.checklistTemplateItemExpressions.forEach(exp => this.expressionformArray.push(this.add_checkExpressionFormGroup(exp)));
        debugger;
    }

    add_checkExpressionFormGroup(exp: ICheckListExpression) {
        let group = this.fb.group(
            {
                id: [exp ? exp.id : 0],
                logicalOperator: [exp ? exp.logicalOperator : null],
                leftComponent: this.componentFormGroup(exp.leftComponent),
                operator: [exp ? exp.operator : null, Validators.required],
                rightComponent: this.componentFormGroup(exp.rightComponent),
                fieldtype: [exp ? exp.fieldType : null],
                transactionType: [this.getTransactionType(exp)],
            }
        );
        if (exp) {
            if (exp.field != null) {
                let field = this.variables!.find(x => x.value == exp.field) as ICheckExpressionFieldLookUp;
                this.setValueType(field.type, group);
            }
        }
        return group;
    }

    componentFormGroup(logic: ICustomJsonLogicComponent | null | undefined) {
        let group = this.fb.group({
            type: [logic ? logic.type : null],
            value: [logic ? logic.value : null,Validators.required],
            label: [logic ? logic.label : null],
            name: [logic ? logic.name : null],
            returnType: [logic ? logic.returnType : null],
            controlType: [logic ? logic.controlType : null,Validators.required],
            padding: [logic ? logic.padding : 20],
            parameters: this.fb.array([]),
        });
        if (logic?.parameters) {
            logic.parameters.forEach(param => {
                (<FormArray>group.get('parameters')).push(this.componentFormGroup(param));
            });
        }
        if(logic)
        {
          if(logic.name)
          {
                let optional=logic.name[logic.name.length-1];
                if(optional=="?")
                {
                  group.get('value')?.clearValidators();
                  group.get('value')?.updateValueAndValidity();
                  group.get('controlType')?.clearValidators();
                  group.get('controlType')?.updateValueAndValidity();
                }
          }
        }
        return group;
    }
    addCheckExpression(i:number) {
        let exp = {} as ICheckListExpression;
        exp.id = 0;
        exp.logicalOperator = 1;
        exp.field = null;
        exp.transactionType = 1;
        exp.leftComponent = null;
        exp.rightComponent = null;
        exp.operator = null;
        exp.value = null;
        if (this.expressionformArray.length == 1) {
            this.expressionformArray.push(this.add_checkExpressionFormGroup(exp));
        }
        else {
            this.expressionformArray.insert(i + 1, this.add_checkExpressionFormGroup(exp));
        }
    }
    removecheckExpresssion(i:number, group: FormGroup | AbstractControl) {
            this.deleteExpression(i);
    }
    deleteExpression(i:number) {
        this.expressionformArray.removeAt(i);
        if (this.expressionformArray.length == 1) {
            let expression = this.expressionformArray.at(0) as FormGroup;
            expression.get('LogicalOperator')?.setValue(null);
        }
    }
    filterOperatorList(i:number) {
        this.filtered_operatorList = [];
        let expression = this.expressionformArray.at(i) as FormGroup;
        let type = this.getLeftComponentType(expression);
        this.operatorList.forEach(op => {
            op.type.forEach(t => {
                if (t == type) {
                    this.filtered_operatorList.push(op);
                }
            });
        });
    }
    getLeftComponentType(expression: FormGroup) {
        let leftComponent = expression.get('leftComponent') as FormGroup;
        let type = null;
        if (leftComponent.get('type')?.value != null) {
            type = leftComponent.get('type')?.value;
        }
        if (leftComponent.get('returnType')?.value != null) {
            type = leftComponent.get('returnType')?.value;
        }
        return type;
    }
    getTransactionType(exp: ICheckListExpression) {
        if (exp) {
            if (exp.transactionType == null) {
                return 1;
            } else if (exp.transactionType == 0) {
                return 2;
            }
            else {
                return exp.transactionType;
            }
        } else {
            return 1;
        }
    }
    setValueType(type:any, expression:any) {
        if (type == "string" || type == "text") {
            expression.get('fieldtype').setValue('text');
        }
        if (type == "number") {
            expression.get('fieldtype').setValue('number');
        }
        if (type == 'date') {
            expression.get('fieldtype').setValue('date');
        }
    }
    getJsonLogic() {

      if(!this.expressionformArray.valid)
      {
        this.expressionformArray.markAllAsTouched();
        return ;
      }
      this.expressionformArray.controls.forEach(exp => {
          if (exp.get('transactionType')?.value != 3) {
              if (this.JsonLogicObj == null) {

                  this.JsonLogicObj = {};
                  this.JsonLogicObj[this.getLogicalOperatorKey(exp.get('logicalOperator')?.value)] = [];
                  let nestedobj:any = {};
                  nestedobj[exp.get('operator')?.value] = [];


                  // left component
                  nestedobj[exp.get('operator')?.value].push(
                      this.generateExpression(<FormGroup>exp.get('leftComponent'), exp.get('leftComponent')?.get('controlType')?.value, exp.get('fieldtype')?.value)
                  );
                  //right
                  nestedobj[exp.get('operator')?.value].push(
                      this.generateExpression(<FormGroup>exp.get('rightComponent'), exp.get('rightComponent')?.get('controlType')?.value, exp.get('fieldtype')?.value)
                  );
                  this.JsonLogicObj[this.getLogicalOperatorKey(exp.get('logicalOperator')?.value)].push(nestedobj);
              }
              else {
                  let obj :any= {};
                  obj[this.getLogicalOperatorKey(exp.get('logicalOperator')?.value)] = [];
                  let nestedobj:any = {};
                  nestedobj[exp.get('operator')?.value] = [];

                  //left
                  nestedobj[exp.get('operator')?.value].push(

                      this.generateExpression(<FormGroup>exp.get('leftComponent'), exp.get('leftComponent')?.get('controlType')?.value, exp.get('fieldtype')?.value)

                  );

                  //right
                  nestedobj[exp.get('operator')?.value].push(
                      this.generateExpression(<FormGroup>exp.get('rightComponent'), exp.get('rightComponent')?.get('controlType')?.value, exp.get('fieldtype')?.value)
                  );


                  obj[this.getLogicalOperatorKey(exp.get('logicalOperator')?.value)].push(nestedobj);
                  // obj[this.getLogicalOperatorKey(exp.get('logicalOperator')?.value)].push(this.JsonLogicObj);
                  //Object.assign(this.JsonLogicObj,obj);
                   this.JsonLogicObj = { ...obj };
              }
          }
      });
      let JSON_lOGIC = JSON.stringify(this.JsonLogicObj);
      sessionStorage.setItem('logiccccc', JSON_lOGIC);
      return JSON_lOGIC;
  }




    // getJsonLogic() {

    //     this.expressionformArray.controls.forEach(exp => {
    //         if (exp.get('transactionType')?.value != 3) {
    //             if (this.JsonLogicObj == null) {

    //                 this.JsonLogicObj = {} as any;

    //                 this.JsonLogicObj[this.getLogicalOperatorKey(exp.get('logicalOperator')?.value)]= [];
    //                 let nestedobj = {}  as  any;
    //                 nestedobj[exp.get('operator')?.value] = [];


    //                 // left component
    //                 nestedobj[exp.get('operator')?.value].push(
    //                     this.generateExpression(<FormGroup>exp.get('leftComponent'), exp.get('leftComponent')?.get('controlType')?.value, exp.get('fieldtype')?.value)
    //                 );
    //                 //right
    //                 nestedobj[exp.get('operator')?.value].push(
    //                     this.generateExpression(<FormGroup>exp.get('rightComponent'), exp.get('rightComponent')?.get('controlType')?.value, exp.get('fieldtype')?.value)
    //                 );
    //                 this.JsonLogicObj[this.getLogicalOperatorKey(exp.get('logicalOperator')?.value)].push(nestedobj);

    //               }
    //             else {
    //                 let obj :any= {};
    //                 obj[this.getLogicalOperatorKey(exp.get('logicalOperator')?.value)] = [];
    //                 let nestedobj = {} as any;
    //                 nestedobj[exp.get('operator')?.value] = [];

    //                 //left
    //                 nestedobj[exp.get('operator')?.value].push(

    //                     this.generateExpression(<FormGroup>exp.get('leftComponent'), exp.get('leftComponent')?.get('controlType')?.value, exp.get('fieldtype')?.value)

    //                 );

    //                 //right
    //                 nestedobj[exp.get('operator')?.value].push(
    //                     this.generateExpression(<FormGroup>exp.get('rightComponent'), exp.get('rightComponent')?.get('controlType')?.value, exp.get('fieldtype')?.value)
    //                 );


    //                 obj[this.getLogicalOperatorKey(exp.get('logicalOperator')?.value)].push(nestedobj);
    //                 obj[this.getLogicalOperatorKey(exp.get('logicalOperator')?.value)].push(this.JsonLogicObj);
    //                 this.JsonLogicObj = { ...obj };
    //             }
    //         }
    //     });
    //     let JSON_lOGIC = JSON.stringify(this.JsonLogicObj);
    //     sessionStorage.setItem('logiccccc', JSON_lOGIC);
    //     return JSON_lOGIC;
    // }
    generateExpression(group: FormGroup, controlType: string, fieldtype: string) {
        if (controlType == "function") {
            let nestedObj = {} as any;
            nestedObj[group.get('value')?.value] = [];
            let params = group.get('parameters') as FormArray;
            params.controls.forEach(g => {
               if(g.get('controlType')?.value==null)
               {
                 nestedObj[group.get('value')?.value].push(null);
               }
              else
             {
                let nested = this.generateExpression(g as FormGroup, g.get('controlType')?.value, g.get('type')?.value);
                nestedObj[group.get('value')?.value].push(nested);
              }

            });
            return nestedObj;
        }
        if (controlType == "variable") {
            return { 'var': group.get('value')?.value };
        }
        if (controlType == "value") {
            if (fieldtype == "date") {
                let date = new Date(group.get('value')?.value).toISOString();
                return date.split('T')[0];
            }
            else {
                return group.get('value')?.value;
            }
        }
    }
    getLogicalOperatorKey(lo:any) {
        if (lo == null || lo == 1) {
            return "and";
        }
        if (lo == 0) {
            return "or";
        }
        return lo;
    }
    getLogicalOperatorValue(key:any) {
        if (key == "and") { return 1 }
        else { return 0; }
    }
    IsISODate(date: string) {
        let regex = new RegExp('^\d{4}-([0]\d|1[0-2]){1,2}-([0-2]\d|3[01])$');
        return regex.test(date);
    }
    getFormGroup(group :any)
    {
        return group as FormGroup;
    }
    consolelogic()
    {
      console.log(this.getJsonLogic());
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
