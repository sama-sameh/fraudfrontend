import { Component, OnInit } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { CustomerService } from '../../../Service/Customer.service';
import { Customer } from '../../../Models/Customer.model';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { Tag } from 'primeng/tag';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { MultiSelect } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-table',
  imports: [
    TableModule,
    DatePipe,
    CurrencyPipe,
    FormsModule,
    Select,
    Tag,
    NgClass,
    IconField,
    InputIcon,
    InputText,
    MultiSelect,
    DropdownModule
  ],
  templateUrl: './table.html',
  standalone: true,
  styleUrl: './table.scss'
})
export class TableComponent implements OnInit{
  // accountNo = input.required<string>()
  // customers!: Customer[];
  // selectedTransactionType: string | null = null;
  //
  // // representatives!: Representative[];
  //
  // // types!: any[];
  //
  // loading: boolean = true;
  //
  // activityValues: number[] = [0, 100];
  //
  // constructor(private customerService:CustomerService) {
  // }
  //
  // ngOnInit() {
  //   // this.transactionService.getTransactionByAccountNo(this.accountNo().toString()).subscribe({
  //   //   next: (data) => {
  //   //     this.transactions = data.map((v) => {
  //   //       return {
  //   //         ...v,
  //   //         date: new Date(v.date) // Convert the date string to a Date object
  //   //       };
  //   //     });
  //   //     console.log("data" ,data);
  //   //     this.loading = false;
  //   //   }
  //   // })
  //   // this.types = [
  //   //   { label: "Transfer", value: "transfer" },
  //   //   { label: "Deposit", value: "deposit" },
  //   //
  //   //
  //   // ];
  //   this.customerService.getCustomers().subscribe({
  //     next: (data) => {
  //       this.customers = data;
  //       console.log("data" ,data);
  //       this.loading = false;
  //     }
  //   })
  // }
  //
  // // clear(table: Table) {
  // //   table.clear();
  // // }
  // getSeverity(type: string) {
  //   switch (type) {
  //     case 'transfer':
  //       return 'transfer';
  //
  //     case 'deposit':
  //       return 'deposit';
  //
  //     case 'withdrawal':
  //       return 'withdrawal';
  //
  //     case 'certificate':
  //       return 'certificate';
  //     default:return null
  //
  //   }
  // }
  // filterByDate(value: string, filter: string): boolean {
  //   if (!value || !filter) {
  //     return true;
  //   }
  //
  //   // Convert both the value and filter strings to Date objects
  //   const valueDate = this.convertStringToDate(value);
  //   const filterDate = this.convertStringToDate(filter);
  //
  //   // Compare the dates
  //   return valueDate.getTime() === filterDate.getTime();
  // }
  //
  // convertStringToDate(dateString: string): Date {
  //   const [day, month, year] = dateString.split('-').map(Number);
  //   return new Date(year, month - 1, day);
  // }


  customers!: Customer[];



  statuses!: any[];

  loading: boolean = true;

  activityValues: number[] = [0, 100];

  constructor(private customerService: CustomerService) {}

  ngOnInit() {
    this.customerService.getCustomers().subscribe({
      next: (data) => {
        this.customers = data;
        this.loading = false;

        // this.customers.forEach((customer) => (customer.date = new Date(<Date>customer.date)));
      }
    })



    this.statuses = [
      { label: 'Unqualified', value: 'unqualified' },
      { label: 'Qualified', value: 'qualified' },
      { label: 'New', value: 'new' },
      { label: 'Negotiation', value: 'negotiation' },
      { label: 'Renewal', value: 'renewal' },
      { label: 'Proposal', value: 'proposal' }
    ];
  }

  clear(table: Table) {
    table.clear();
  }

  getSeverity(status: string) {
    switch (status) {
      case 'unqualified':
        return 'danger';

      case 'qualified':
        return 'success';

      case 'new':
        return 'info';

      case 'negotiation':
        return 'warn';

      case 'renewal':
        return null;
      default:
        return null;
    }
  }

  protected readonly HTMLInputElement = HTMLInputElement;
}
