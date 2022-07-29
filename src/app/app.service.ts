import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { ICheckExpressionFieldLookUp } from 'JsonLogicEditor';
import { forkJoin, map } from 'rxjs';
import * as _ from 'lodash';
import { ICheckExpressionFieldLookUp } from 'JsonLogicEditor';
// import { ICheckExpressionFieldLookUp } from 'projects/json-logic-editor/src/lib/interfaces/IJsonEditor';
@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private http:HttpClient) { }

getfunctions() {
  return this.http.get<ICheckExpressionFieldLookUp[]>('../assets/functions.json');
}
getCheckExpressionFieldsList() {
let entityId="277b8acd-b8b5-43c0-8b83-6314ec99b46c";
  let forms = this.http.get<any>("../../assets/content.json")
  let layouts = this.http.get<any>("../../assets/variables.json");
  return forkJoin([forms, layouts]).pipe(
      map((res) => {
          let forms = res[0] as IForm[];
          let layoutsList = res[1] as ICaseRecordFieldsDto[];
          let list = [] as ICheckExpressionFieldLookUp[];
          let schema = this.convertSchemaIntoObject(forms[0].jsonSchema) as ISchema[];
          schema.forEach(lst => {
              list.push({
                  name: lst.Title,
                  label: '[Content] ' + lst.Title,
                  value: lst.Key,
                  type: lst.Type,
                  controlType: "variable",
              })
          });
          layoutsList.forEach(lst => {
              list.push({
                  name: lst.fieldName,
                  label: '[Case] ' + lst.fieldName,
                  value: lst.caseFieldName,
                  type: lst.dataType,
                  controlType: "variable",
              })
          });
          return list;
      }));
}
convertSchemaIntoObject(schemaString: string): ISchema[] {
  var formList :any= [];
  var schema = JSON.parse(schemaString);
  while (typeof schema === "string") {
      //To verify documentDetail is still string event after parse
      schema = JSON.parse(schema);
  }
  if (Object.keys(schema.properties).length != 0) {
      Object.keys(schema.properties).forEach((element) => {
          let schemaObject = {} as ISchema;
          schemaObject.Key = element;
          if (schema.properties[element]["Visibility"]) {
              schemaObject.Visibility =
                  schema.properties[element]["Visibility"];
          }
          if (schema.properties[element]["Validation"]) {
              schemaObject.Validation =
                  schema.properties[element]["Validation"];
          }
          if (schema.properties[element]["pageNumber"]) {
              schemaObject.pageNumber =
                  schema.properties[element]["pageNumber"];
          }
          if (schema.properties[element]["SortOrder"]) {
              schemaObject.SortOrder =
                  +schema.properties[element]["SortOrder"];
          }
          if (schema.properties[element]["title"]) {
              schemaObject.Title = schema.properties[element]["title"];
          }
          if (schema.properties[element]["type"]) {
              schemaObject.Type = schema.properties[element]["type"];
              if (schemaObject.Type == "array") {
                  schemaObject.items = this.convertSchemaIntoObject(
                      JSON.stringify(schema.properties[element]["items"])
                  );
              }
          }
          if (schema.properties[element]["Required"]) {
              schemaObject.Required =
                  schema.properties[element]["Required"];
          }
          if (schema.properties[element]["Sensitivity"]) {
              schemaObject.Sensitivity =
                  schema.properties[element]["Sensitivity"];
          }
          if (schema.properties[element]["MinimumLength"]) {
              schemaObject.MinimumLength =
                  schema.properties[element]["MinimumLength"];
          }
          if (schema.properties[element]["MaximumLength"]) {
              schemaObject.MaximumLength =
                  schema.properties[element]["MaximumLength"];
          }
          if (schema.properties[element]["Pattern"]) {
              schemaObject.Pattern =
                  schema.properties[element]["Pattern"];
          }
          if (schema.properties[element]["Description"]) {
              schemaObject.Description =
                  schema.properties[element]["Description"];
          }
          if (schema.properties[element]["recognitionType"]) {
              schemaObject.recognitionType =
                  schema.properties[element]["recognitionType"];
          }
          if (schema.properties[element]["isCaseLookup"]) {
              schemaObject.isCaseLookup =
                  schema.properties[element]["isCaseLookup"];
          }
          if (schema.properties[element]["hasCaseFieldMapping"]) {
              schemaObject.hasCaseFieldMapping =
                  schema.properties[element]["hasCaseFieldMapping"];
          }
          if (schema.properties[element]["caseFieldID"]) {
              schemaObject.caseFieldID =
                  schema.properties[element]["caseFieldID"];
          }

          //TODO - Removed above once all the elements are pascel casing
          if (schema.properties[element]["visibility"]) {
              schemaObject.Visibility =
                  schema.properties[element]["visibility"];
          }
          if (schema.properties[element]["validation"]) {
              schemaObject.Validation =
                  schema.properties[element]["validation"];
          }
          if (schema.properties[element]["sortOrder"]) {
              schemaObject.SortOrder =
                  +schema.properties[element]["sortOrder"];
          }
          if (schema.properties[element]["title"]) {
              schemaObject.Title = schema.properties[element]["title"];
          }
          if (schema.properties[element]["type"]) {
              schemaObject.Type = schema.properties[element]["type"];
          }
          if (schema.properties[element]["required"]) {
              schemaObject.Required =
                  schema.properties[element]["required"];
          }
          if (schema.properties[element]["sensitivity"]) {
              schemaObject.Sensitivity =
                  schema.properties[element]["sensitivity"];
          }
          if (schema.properties[element]["minimumLength"]) {
              schemaObject.MinimumLength =
                  schema.properties[element]["minimumLength"];
          }
          if (schema.properties[element]["maximumLength"]) {
              schemaObject.MaximumLength =
                  schema.properties[element]["maximumLength"];
          }
          if (schema.properties[element]["pattern"]) {
              schemaObject.Pattern =
                  schema.properties[element]["pattern"];
          }
          if (schema.properties[element]["description"]) {
              schemaObject.Description =
                  schema.properties[element]["description"];
          }
          if (schema.properties[element]["pageNumber"] == undefined) {
              schemaObject.pageNumber = 1;
          }

          formList.push(schemaObject);
      });

      if (formList[0].SortOrder) {
          return _.sortBy(formList, "SortOrder");
      }
  }
  return formList;
}

}
export interface IForm {
  name: string;
  edition: string;
  pages: number;
  templateLibrary: string;
  entityId: string;
  formPages: IFormPage[];
  jsonSchema: string;
  outputMapping: string;
  isUnstructured: boolean;
  id: string;
}
export interface IFormPage {
  pageNumber: number;
  huMoments: string;
}
export interface ICaseRecordFieldsDto {
  fieldName: string | undefined;
  text: string | undefined;
  dataType: string | undefined | null;
  uiControl: string | undefined;
  description: string | undefined;
  isHidden: boolean;
  isLookup: boolean;
  lookupType: string | undefined;
  displayOrder: number;
  isSearchable: boolean;
  caseRecordFieldId: string;
  caseFieldName: string | undefined;
  id: string;
}
export interface ISchema {
  Id: number | undefined;
  Key: string | undefined;
  Visibility: string | undefined;
  Type: string | undefined
  Title: string | undefined
  isDone: boolean | undefined
  Importance: string | undefined
  Sensitivity: string | undefined
  SortOrder: number | undefined
  Required: boolean | undefined
  Pattern: string | undefined;
  Validation: IValidation | undefined;
  MaximumLength: number | undefined;
  MinimumLength: number | undefined;
  MaximumItems: number | undefined;
  MinimumItems: number | undefined;
  Description: string | undefined;
  selected: boolean | undefined;
  pageNumber: number | undefined;
  recognitionType: string | undefined;
  isCaseLookup: string | undefined;
  hasCaseFieldMapping: string | undefined;
  caseFieldID: string | undefined;
  items: ISchema[];
}
export interface IValidation {
  Id: string | undefined
  Name: string | undefined
  RegularExpression: string | undefined
  IsCustomValidationstring: boolean | undefined
  IsLookupValidation: boolean | undefined
  LookupName: string | undefined
  IsRegulatExpression: boolean | undefined
  CustomValidationType: string | undefined
}
