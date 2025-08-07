import { Component,  OnInit } from '@angular/core';
import { FormBuilder,  FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCard, MatCardTitle } from '@angular/material/card';
import { NgForOf, NgIf } from '@angular/common';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatOption } from '@angular/material/core';
import { MatDivider } from '@angular/material/divider';
import { ActivatedRoute } from '@angular/router';
import { METADATA } from './MetaData';
import { MatButton } from '@angular/material/button';
import { MatSelect } from '@angular/material/select';
import { AccountService } from '../../../Service/Account.service';
import { CustomerService } from '../../../Service/Customer.service';
import { AccountDTO } from '../../../DTO/AccountDTO';
import { Customer } from '../../../Models/Customer.model';
import { Rule } from '../../../Models/Rule.model';
import { RuleService } from '../../../Service/Rule.service';
import { MatIcon } from '@angular/material/icon';
import { Dialog } from 'primeng/dialog';
import { ButtonDirective } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { Card } from 'primeng/card';
import { InputText } from 'primeng/inputtext';

@Component({
  selector: 'app-form',
  imports: [
    MatFormField,
    MatFormField,
    MatCard,
    MatCardTitle,
    ReactiveFormsModule,
    MatFormField,
    MatFormField,
    MatLabel,
    MatError,
    MatFormField,
    NgIf,
    MatError,
    MatInput,
    MatFormField,
    MatOption,
    MatDivider,
    NgForOf,
    MatButton,
    MatSelect,
    MatIcon,
    Dialog,
    ButtonDirective,
    DropdownModule,
    Card,
    InputText
  ],
  templateUrl: './form.html',
  standalone: true,
  styleUrl: './form.css'
})
export class Form implements OnInit {
  formType:string='';
  dynamicForm : FormGroup = new FormGroup({});
  fields:string[]=[]
  dropdownOptions: { [key: string]: any[] } = {};
  protected readonly METADATA = METADATA;
  showSuccessDialog: boolean = false;


  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder,private accountService: AccountService,private customerService: CustomerService,private ruleService: RuleService)  {}
  //
  onSubmit() {
    if (this.dynamicForm.valid) {
      this.manageSubmit();
      this.showSuccessDialog = true;

    } else {
      this.dynamicForm.markAllAsTouched();
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const entity = params.get('entity');
      if (entity) {
        this.formType = entity;
        this.loadMetaData()
        if (this.formType=="condition"){
          this.dynamicForm.get('Type')?.valueChanges.subscribe(selectedType => {
            // Find the Value field
            const valueField = this.METADATA[this.formType].fields.find(f => f.name === 'Value');

            if (valueField) {
              // Dynamically set the type of the Value field
              valueField.type = selectedType || 'text'; // fallback to text if empty
            }
          });
        }
      }
    });

  }
  loadMetaData() {
    const metadata = METADATA[this.formType];

    if (!metadata) return;

    const group: any = {};

    metadata.fields.forEach(field => {
      const validators = [];

      field.validators?.forEach(v => {
        if (v === 'required') validators.push(Validators.required);
        else if (v.startsWith('min:')) validators.push(Validators.min(+v.split(':')[1]));
        else if (v.startsWith('minLength:')) validators.push(Validators.minLength(+v.split(':')[1]));
        else if (v.startsWith('maxLength:')) validators.push(Validators.maxLength(+v.split(':')[1]));
      });

      group[field.name] = ['', validators];

      if (field.type === 'dropdown' && field.datasource) {
        this.loadDropdownOptions(field.datasource, field.name);
      }
    });

    this.dynamicForm = this.formBuilder.group(group);
  }
  private loadDropdownOptions(datasource:string, fieldName:string) {
    if (datasource === 'getCurrencies') {
      this.accountService.getCurrencies().subscribe(currencies => {
        this.dropdownOptions[fieldName]= currencies.map(c=>({
          label:c,
          value:c
        }))
      })
    }

    else if (datasource === 'getAccountTypes') {
      this.accountService.getAccountTypes().subscribe(currencies => {
        this.dropdownOptions[fieldName]= currencies.map(c=>({
          label:c,
          value:c
        }))
      })
    }

    else if (datasource === 'getCustomers') {{
      this.customerService.getCustomers().subscribe(customers => {
        this.dropdownOptions[fieldName]= customers;
      })
    }}
    else if (datasource === 'getStatus') {{
      this.dropdownOptions[fieldName]= [
        {
          label:"Draft",
          value:"Draft"
        },
        {
          label:"Published",
          value:"Published"
        },
        {
          label:"new",
          value:"new"
        }
      ]
    }}

    else if (datasource === 'getConditionTypes') {{
      this.dropdownOptions[fieldName]= [
        {
          label:"text",
          value:"text"
        },
        {
          label:"number",
          value:"number"
        }
      ]
    }}
    else if (datasource === 'getRules') {{
      this.ruleService.getRules().subscribe(rules => {
        this.dropdownOptions[fieldName]= rules;
      })
    }}


  }

  manageSubmit(){
    const formData = this.dynamicForm.value;
    if (this.formType === 'account') {
      const account = new AccountDTO();
      account.balance = formData['Balance'];
      account.type = formData['Type'];
      account.currency = formData['Currency'];
      account.customerId =  formData['Customer']; // Assuming only id is needed

      this.accountService.addAccount(account).subscribe({
        next: (res) => console.log('Account created successfully', res),
        error: (err) => console.error('Failed to create account', err)
      });
    }
    else if (this.formType === 'customer') {
      const customer = new Customer();
      customer.name = formData['Name'];
      customer.nationality_id = formData['Nationality Number'];
      customer.phone_number = formData['Phone Number'];

      this.customerService.addCustomer(customer).subscribe({
        next: (res) => console.log('Customer added successfully', res),
        error: (err) => console.error('Failed to add customer', err)
      });
    }
    else if (this.formType === 'rule') {
      const rule = new Rule();
      rule.rule_name = formData['Rule Name'];
      rule.type = formData['Type'];
      rule.status = formData['Status'];

      this.ruleService.addRule(rule).subscribe({
        next: (res) => console.log('rule created successfully', res),
        error: (err) => console.error('Failed to create rule', err)
      });
    }
    this.dynamicForm.reset();
  }
}
