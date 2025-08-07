import { Customer } from './Customer.model';

export class Account {
  account_no:string = '';
  currency:string='';
  type:string='';
  balance:number=0;
  customer:Customer;
}
