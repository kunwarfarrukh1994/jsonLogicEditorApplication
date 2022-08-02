# JsonLogicEditorApplication

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.4.

# Install and Imports

### Step 1 Install :
#### ngx-bootstrap
npm install ngx-bootstrap --save
#### Ng-Select
npm install --save @ng-select/ng-select

### Step 2: Include a theme: 
```scss
 style.css:
 @import "~@ng-select/ng-select/themes/default.theme.css";

```
### Step 3: Add this bootsrap link to your index.html : 
```scss
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We">
<link rel="stylesheet" href="https://unpkg.com/ngx-bootstrap/datepicker/bs-datepicker.css">
```
### Step 4: Import the JsonLogicEditorModule in App module:
```js
import { JsonLogicEditorModule } from 'projects/json-logic-editor/src/public-api';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    JsonLogicEditorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
### Step 5: App Module.html
```html App Module
  <jsonlogic-expression-editor [jsonLogic]="logic" [functions]="functions" [variables]="variables">
```
### Component Inputs:
## jsonLogic :
```
[jsonLogic]="{"and":[{"==":[{"substring":["ffff",{"var":"SubjectPhoneNumber"},null]},"sssss"]}]}"
```

## [functions] :
```ts
import { ICheckExpressionFieldLookUp } from 'json-logic-editor';
functions: ICheckExpressionFieldLookUp[];
```

## [variables] :
```ts
import { ICheckExpressionFieldLookUp } from 'json-logic-editor';
variables :ICheckExpressionFieldLookUp[];
```
### Interface
```html
export interface ICheckExpressionFieldLookUp {
  label?: string;
  name?: string;
  value: any;
  type: string | null | undefined;  //  it will be null if  controlerType is "function" And it will not be null if  controlerType is "variable" or "value"
  controlType?: string;   //  it will be "function" ,"variable", "value" only 
  returnType?: string;      //  it will be null if the controllerType is  "variable" or "value"  and  it will not be null if  controlerType is "function"
  padding?: number;
  parameters?: ICheckExpressionFieldLookUp[];
}
``` 


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


