import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Rule } from '../Models/Rule.model';
import { TreeNode } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import { Condition } from '../Models/Condition.model';
import { ConditionService } from './Condition.service';

@Injectable({
  providedIn: 'root'
})
export class RuleService {
  private baseUrl= environment.apiUrl+'/rules';
  constructor(private http: HttpClient,private conditionService:ConditionService) { }
  addRule(rule: Rule) {
    return this.http.post(this.baseUrl+'/create',rule);
  }
  getRules(){
    return this.http.get<Rule[]>(`${this.baseUrl}/all`);
  }
  async getRuleTreeTableNodes(): Promise<TreeNode[]> {
    const rules = await firstValueFrom(this.getRules());

    const treeNodes: TreeNode[] = await Promise.all(
      rules.map(async (rule) => {
        const conditions = await firstValueFrom(this.conditionService.getConditionByRule(rule.ruleId));
        const conditionChildren: TreeNode[] = conditions.map((condition, index) => ({
          key: `${rule.ruleId}-condition-${index}`,
          data: {
            name: 'Condition Number:'+condition.id ,
            type: this.getConditionString(condition),
            status: ''
          },
          leaf: true
        }));

        return {
          key: rule.ruleId.toString(),
          data: {
            id: rule.ruleId.toString(),
            name: rule.rule_name,
            type: rule.type,
            status: rule.status
          },
          children: conditionChildren,
          leaf: conditionChildren.length === 0
      };
      })
    );

    return treeNodes;
  }

  getConditionString(condition: any): string {
    if (!condition) return '';

    const {
      field,
      operator,
      value,
      valueType,
      source,
      sourceField,
      aggregationFunction,
      time_interval,
      logicalConnector
    } = condition;

    // Left-hand side: field or aggregation
    const lhs = aggregationFunction ? `${aggregationFunction.toUpperCase()}(${field})` : field;

    // Right-hand side
    let rhs = '';
    if (valueType === 'static') {
      rhs = value;
    } else if (valueType === 'dynamic') {
      const srcTable = source || 'UNKNOWN_TABLE';
      const srcField = sourceField || 'UNKNOWN_FIELD';
      rhs = `${srcTable}.${srcField}`;
    }

    // Build base condition string
    let conditionStr = `${lhs} ${operator} ${rhs}`;

    // Add time interval if exists
    if (time_interval) {
      conditionStr += ` in last ${time_interval}`;
    }

    // Add logical connector if exists
    if (logicalConnector && logicalConnector.trim() !== '') {
      conditionStr += ` ${logicalConnector.toUpperCase()}`;
    }

    return conditionStr;
  }
  deleteRuleById(ruleId:number){
    return this.http.delete<Rule>(`${this.baseUrl}/delete/${ruleId}`);
  }

}
