# JsonLogicEditor

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.0.

## Code scaffolding

Run `ng generate component component-name --project JsonLogicEditor` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project JsonLogicEditor`.

> Note: Don't forget to add `--project JsonLogicEditor` or else it will be added to the default project in your `angular.json` file.

## Build

Run `ng build JsonLogicEditor` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build JsonLogicEditor`, go to the dist folder `cd dist/json-logic-editor` and run `npm publish`.

## Running unit tests

Run `ng test JsonLogicEditor` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# Install and Imports

** Step 1: **
install : npm i ngx-bootstrap
Add index.html :

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We">

## Step 2:

install : npm install --save @ng-select/ng-select
style.css: @import "~@ng-select/ng-select/themes/default.theme.css";

## Step 3:

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';  
Add index.html : <link rel="stylesheet" href="https://unpkg.com/ngx-bootstrap/datepicker/bs-datepicker.css">
imports App Module : ** BsDatepickerModule.forRoot() **
providers: ** BsDatepickerConfig **

## Step 4:

** Add Code AppComponentHtml: **

<div *ngIf="functions.length>0  && this.variables.length>0">
  <jsonlogic-expression-editor
  [jsonLogic]="logic" [functions]="functions" [variables]="variables"
  ></jsonlogic-expression-editor>
</div>

** Add Code AppComponent.ts : **
logic=`{"and":[{"==":[{"substring":["ffff",{"var":"SubjectPhoneNumber"},null]},"sssss"]}]}`;
functions:any=[];
variables:any=[];
constructor(private ss:AppService){this.getfunctions()
async getfunctions(){
this.functions= await lastValueFrom(this.ss.getfunctions());
this.variables=await lastValueFrom(this.ss.getCheckExpressionFieldsList());}
AppModule imports : ** JsonLogicEditorModule **
