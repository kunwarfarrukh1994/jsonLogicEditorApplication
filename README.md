# JsonLogicEditorApplication

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.4.

# Install and Imports

### Step 1 Install :

#### ngx-bootstrap

| ngx-bootstrap | Angular         | Bootstrap CSS           |
| ------------- | --------------- | ----------------------- |
| 8.0.0         | 12.x.x - 13.x.x | 5.x.x or 4.x.x or 3.x.x |
| 7.1.0         | 11.x.x - 12.x.x | 5.x.x or 4.x.x or 3.x.x |
| 7.0.0         | 11.x.x - 12.x.x | 3.x.x or 4.x.x          |
| 6.0.0         | 9.x.x - 10.x.x  | 3.x.x or 4.x.x          |
| 5.6.x         | 7.x.x - 9.1.0   | 3.x.x or 4.x.x          |
| 5.0.0 - 5.6.0 | 7.x.x - 8.x.x   | 3.x.x or 4.x.x          |
| 4.x.x         | 6.x.x - 7.x.x   | 3.x.x or 4.x.x          |
| 3.x.x         | 6.x.x - 7.x.x   | 3.x.x or 4.x.x          |
| 2.x.x         | 2.x.x - 4.x.x   | 3.x.x or 4.x.x          |
| 1.x.x         | 2.x.x           | 3.x.x or 4.x.x          |

npm install ngx-bootstrap --save

#### Ng-Select

npm install --save @ng-select/ng-select

### Step 2: Include a theme:

```scss
style.css: @import "~@ng-select/ng-select/themes/default.theme.css";
```

### Step 3: Add this bootsrap link to your index.html :

```scss
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We">
<link rel="stylesheet" href="https://unpkg.com/ngx-bootstrap/datepicker/bs-datepicker.css">
```

### Step 4: Import the JsonLogicEditorModule in App module:

```js
import { JsonLogicEditorModule } from "projects/json-logic-editor/src/public-api";
@NgModule({
  declarations: [AppComponent],
  imports: [JsonLogicEditorModule,NgSelectModule]
  imports: [
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    ...
  ]
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

### Step 5: App Module.html

```html App Module
<jsonlogic-expression-editor
  [jsonLogic]="logic"
  [functions]="functions"
  [variables]="variables"
></jsonlogic-expression-editor>
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
export interface ICheckExpressionFieldLookUp { label?: string; name?: string;
value: any; type: string | null | undefined; // it will be null if controlerType
is "function" And it will not be null if controlerType is "variable" or "value"
controlType?: string; // it will be "function" ,"variable", "value" only
returnType?: string; // it will be null if the controllerType is "variable" or
"value" and it will not be null if controlerType is "function" padding?: number;
parameters?: ICheckExpressionFieldLookUp[]; }
```

## Example

functions = [

{

name: 'substring',

controlType: 'function',

type: null,

returnType: 'string',

parameters: [

{

name: 'string',

type: 'string',

controlType: null,

returnType: null,

parameters: null,

},

{

name: 'number',

type: 'number',

returnType: null,

controlType: null,

parameters: null,

},

{

name: 'length?',

type: 'number',

returnType: null,

controlType: null,

parameters: null,

},

],

},

{

name: 'floor',

returnType: 'number',

controlType: 'function',

type: null,

parameters: [

{

name: 'number',

type: 'number',

controlType: null,

parameters: null,

returnType: null,

},

],

},

{

name: 'cat',

returnType: 'string',

controlType: 'function',

type: null,

parameters: [

{

name: 'string1',

type: 'string',

controlType: null,

parameters: null,

returnType: null,

},

{

name: 'string2',

type: 'string',

controlType: null,

parameters: null,

returnType: null,

},

],

},

];

variables = [

{

label: 'variable1',

name: 'variable1',

value: 'variable1',

type: 'string',

controlType: 'variable',

returnType: null,

padding: 0,

parameters: null,

},

{

label: 'variable2',

name: 'variable2',

value: 'variable2',

type: 'string',

controlType: 'variable',

returnType: null,

padding: 0,

parameters: null,

},

{

label: 'variable3',

name: 'variable3',

value: 'variable3',

type: 'string',

controlType: 'variable',

returnType: null,

padding: 0,

parameters: null,

},

];

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
