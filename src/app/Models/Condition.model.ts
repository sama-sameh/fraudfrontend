import { Rule } from './Rule.model';

export class Condition {
  id:number;
  type:string;
  operator:string;
  field:string;
  value:string;
  valueType:string;
  logicalConnector:string;
  rule:Rule;
  time_interval:string;
  aggregationFunction:string;
  source:string;
  sourceField:string;
}
