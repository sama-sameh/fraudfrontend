import { Component, Input, OnInit } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { Condition } from '../../../Models/Condition.model';
import { Rule } from '../../../Models/Rule.model';
import { MatOption, MatSelect } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-condition-editor',
  standalone: true,
  imports: [
    MatLabel,
    MatFormField,
    MatSelect,
    FormsModule,
    MatOption,
    NgForOf,
    MatInput,
    NgIf
  ],
  templateUrl: './condition-editor.component.html',
  styleUrl: './condition-editor.component.scss'
})
export class ConditionEditorComponent implements OnInit{
  @Input() condition!: Condition;
  operators = [
    { value: 'equals', display: 'Equals' },
    { value: 'notEquals', display: 'Not Equals' },
    { value: 'greaterThan', display: 'Greater Than' },
    { value: 'lessThan', display: 'Less Than' },
    { value: 'contains', display: 'Contains' },
    { value: 'startsWith', display: 'Starts With' },
    { value: 'endsWith', display: 'Ends With' }
  ];

  fields = [
    { value: 'transactionAmount', display: 'Transaction Amount' },
    { value: 'transactionCurrency', display: 'Transaction Currency' },
    { value: 'merchantCategory', display: 'Merchant Category' },
    { value: 'locationCountry', display: 'Location Country' },
    { value: 'ipAddress', display: 'IP Address' }
  ];

  logicalConnectors = [
    { value: 'AND', display: 'AND' },
    { value: 'OR', display: 'OR' }
  ];

  aggregationFunctions = [
    { value: '', display: 'None' },
    { value: 'sum', display: 'Sum' },
    { value: 'count', display: 'Count' },
    { value: 'average', display: 'Average' },
    { value: 'max', display: 'Maximum' },
    { value: 'min', display: 'Minimum' }
  ];

  timeIntervals = [
    { value: '', display: 'None' },
    { value: '1h', display: '1 Hour' },
    { value: '24h', display: '24 Hours' },
    { value: '7d', display: '7 Days' },
    { value: '30d', display: '30 Days' }
  ];

  constructor() {}

  ngOnInit(): void {
    if (!this.condition) {
      this.condition = {
        id: 0,
        type: '',
        operator: 'equals',
        field: '',
        value: '',
        valueType: 'string',
        logicalConnector: 'AND',
        rule: {} as Rule,
        time_interval: '',
        aggregationFunction: ''
      };
    }
  }
}
