import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { InputText } from 'primeng/inputtext';
import { Button, ButtonDirective } from 'primeng/button';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardTitle } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../../../Service/Account.service';
import { CustomerService } from '../../../Service/Customer.service';
import { RuleService } from '../../../Service/Rule.service';
import { AccountDTO } from '../../../DTO/AccountDTO';
import { Customer } from '../../../Models/Customer.model';
import { Rule } from '../../../Models/Rule.model';
import { METADATA } from '../form/MetaData';
import { Divider } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    Dialog,
    InputText,
    Button,
    ButtonDirective,
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
    ReactiveFormsModule,
    Divider,
    NgClass,
    DropdownModule
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  @Input( )visible: boolean;
  showDialog() {
    this.visible = false;
  }

  @Input() formType:string='';
  @Output() close = new EventEmitter<void>();

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
    if (this.formType) {
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
        }
      ]
    }}
    else if (datasource === 'getOperators') {{
      this.dropdownOptions[fieldName]= [
        {
          label:">",
          value:">"
        },
        {
          label:"=",
          value:"="
        },
        {
          label:"<",
          value:"<"
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
  closeDialog(){
    this.showSuccessDialog = false
    this.visible = false;
    this.close.emit();
  }

}
