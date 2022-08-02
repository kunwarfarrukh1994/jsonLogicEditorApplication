# JsonLogicEditorApplication

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities...

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# Install and Imports

## Step 1:
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

 Add Code AppComponentHtml: 

< *ngIf="functions.length>0  && this.variables.length>0">
  <jsonlogic-expression-editor
  [jsonLogic]="logic" [functions]="functions" [variables]="variables"
  ></jsonlogic-expression-editor>


Add Code AppComponent.ts :
logic=`{"and":[{"==":[{"substring":["ffff",{"var":"SubjectPhoneNumber"},null]},"sssss"]}]}`;
functions:any=[];
variables:any=[];
constructor(private ss:AppService){this.getfunctions()
async getfunctions(){
this.functions= await lastValueFrom(this.ss.getfunctions());
this.variables=await lastValueFrom(this.ss.getCheckExpressionFieldsList());}
AppModule imports : ** JsonLogicEditorModule **
