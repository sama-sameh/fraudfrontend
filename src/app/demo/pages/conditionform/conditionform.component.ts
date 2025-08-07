import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatOption } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';
import { NgForOf, NgIf } from '@angular/common';
import { SharedModule } from '../../../theme/shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RuleService } from '../../../Service/Rule.service';
import { Rule } from '../../../Models/Rule.model';
import { Condition } from '../../../Models/Condition.model';
import { ConditionService } from '../../../Service/Condition.service';
import { MatTab, MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { MatCheckbox } from '@angular/material/checkbox';
import { DatabaseService } from '../../../Service/DatabaseService';
import { Button, ButtonDirective } from 'primeng/button';
import { Step, StepList, StepPanel, StepPanels, Stepper } from 'primeng/stepper';
import { DropdownModule } from 'primeng/dropdown';
import { TabPanel, TabView } from 'primeng/tabview';
import { InputText } from 'primeng/inputtext';
import { Dialog } from 'primeng/dialog';


@Component({
  selector: 'app-conditionform',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardTitle,
    MatDivider,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    NgForOf,
    NgIf,
    SharedModule,
    MatCardHeader,
    MatTab,
    MatTabGroup,
    MatCheckbox,
    MatInputModule,
    MatTabsModule,
    Button,
    StepPanel,
    Stepper,
    Step,
    StepPanels,
    StepList,
    ButtonDirective,
    DropdownModule,
    TabPanel,
    InputText,
    TabView,
    Dialog
  ],
  templateUrl: './conditionform.component.html',
  styleUrl: './conditionform.component.css'
})
export class ConditionformComponent implements OnInit{
  dropdownOptions: { [key: string]: any[] } = {
    type: [],
    operator: ['=', '!=', '>', '<', 'IN', 'NOT IN', 'BETWEEN', 'LIKE'],
    valueType: ['static', 'dynamic'],
    logicalConnector: ['AND', 'OR'],
    field: [] ,
    source:['customer_activity','high_risk_countries','transaction', 'customer', 'account', 'device', 'login'],
    sourceField:[],
    interval:['1 Minute','5 Minutes','10 Minutes','15 Minutes','30 Minutes','60 Minutes'],
    aggregationFunction:['sum','count']
  };
  rules:Rule[];
  classFields: { [key: string]: string[] } = {
    transaction: ['amount', 'date', 'type','knownDevices','habitualHours','averageAmount','location'],
    account: ['type', 'currency','status'],
    device: ['device_id', 'ip_address'],
    login: ['failedAttempts', 'lastFailedAttemptTime'],
    customer_activity:['failed_attempts','date'],
    high_risk_countries:['country_name']
  };
  staticSource = true;
  @Input( )visible: boolean;
  @Output() close = new EventEmitter<void>();
  @Input() selectedRuleId:number;
  conditionForm: FormGroup = this.formBuilder.group({
    type: ['', Validators.required], // e.g., "transaction", "user", "account"
    field: ['', Validators.required], // field from selected type
    operator: ['', Validators.required], // e.g., '=', '!=', '>', 'IN'
    value: [''], // can be string, number, or list
    valueType: ['', Validators.required], // "static" or "dynamic"
    logicalConnector: [''] ,// optional; e.g., "AND", "OR"
    ruleId: ['', Validators.required],
    source: [''],
    sourceField: [''],
    interval:[''],
    aggregationFunction:['']
  });
  onTypeChange(type: string): void {
    this.loadFields(type,"field");

  }
  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder,private ruleService: RuleService,private conditionService:ConditionService,private databaseService:DatabaseService)  {}
  //
  onSubmit() {
    console.log(this.conditionForm)

      console.log(this.conditionForm)
      const condition: Condition = {
        field: this.conditionForm.value['field'],
        id: 0,
        logicalConnector: this.conditionForm.value['logicalConnector'],
        operator: this.conditionForm.value['operator'],
        rule: new Rule(),
        type: this.conditionForm.value['type'],
        value: this.conditionForm.value['value'],
        valueType: this.conditionForm.value['valueType'],
        aggregationFunction: this.conditionForm.value['aggregationFunction'],
        time_interval: this.conditionForm.value['interval'],
        source:this.conditionForm.value['source'],
        sourceField:this.conditionForm.value['sourceField'],

      }
      condition.rule.ruleId = this.conditionForm.value['ruleId'];
      console.log(condition)
      this.conditionService.addCondition(condition).subscribe({
        next: (res) => {
          console.log('Condition created successfully', res);
          this.conditionForm.reset();
        },
        error: (err) => console.error('Failed to create condition', err)

      })

    // } else {
    //   this.conditionForm.markAllAsTouched();
    //
  }

  ngOnInit(): void {
    // this.selectedRuleId = Number(this.route.snapshot.paramMap.get('ruleId'));

    this.loadRules();
    this.loadTables();
    setTimeout(() => {
      if (this.selectedRuleId) {
        this.conditionForm.patchValue({ ruleId: this.selectedRuleId });
      }
    });
  }

  private loadRules() {
    this.ruleService.getRules().subscribe(rules => {
      this.rules = rules

      if (this.selectedRuleId) {
        const foundRule = this.rules.find(rule => rule.ruleId == this.selectedRuleId);
        if (foundRule) {
          this.conditionForm.patchValue({ ruleId: foundRule.ruleId });
        }
      }
    });
  }
  private loadTables() {
    this.databaseService.getTables().subscribe(tables => {
       this.dropdownOptions['type'] = tables;
       this.dropdownOptions['source'] = tables;
    })
  }
private loadFields(tableName: string,col:string): any {
    this.databaseService.getFieldsForTable(tableName).subscribe(fields => {
      this.dropdownOptions[col] = fields
      console.log(fields)
    })
}

 onValueChange(type: string): void {
    this.staticSource = type == "static";
 }
  onSourceChange(type: string): void {
    this.loadFields(type,"sourceField");
  }
  closeDialog(){
    this.visible = false;
    this.close.emit();
  }
}
