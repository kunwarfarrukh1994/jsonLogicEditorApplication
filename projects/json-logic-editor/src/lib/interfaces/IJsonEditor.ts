
export interface ICheckExpressionFieldLookUp {
  label?: string;
  name?: string;
  value: any;
  type: string | null | undefined;
  controlType?: string;
  returnType?: string |null | undefined;
  padding?: number;
  parameters?: ICheckExpressionFieldLookUp[];
}

export interface ICheckListExpression {
  logicalOperator: number;
  field: string | null | undefined;
  operator: string| null | undefined;
  value: string | null | undefined;
  checklistTemplateItemId: number;
  transactionType: number;
  id: number;
  fieldType: string | null | undefined;
  leftComponent: ICustomJsonLogicComponent| null;
  rightComponent: ICustomJsonLogicComponent| null;
}
export interface ICustomJsonLogicComponent {
  label: string | null | undefined;
  type: string | null | undefined;
  controlType?: string | null;
  value: any;
  name: string | null | undefined;
  returnType: string | null| undefined;
  padding: number;
  parameters: ICustomJsonLogicComponent[] | null | undefined;

}
