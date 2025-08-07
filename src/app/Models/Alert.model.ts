import { Account } from './Account.model';
import { Rule } from './Rule.model';
import { Transaction } from './Transaction.model';
import { Customer } from './Customer.model';

export class Alert{
  suspectId:number;
  account:Account ;
  rule:Rule;
  transaction:Transaction;
  actionMassage:string ;
  customer:Customer;
  date:Date;
  alertAge:number;
  takenAction:string;
    
}
