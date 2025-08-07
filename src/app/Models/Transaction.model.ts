import { Device } from './Device.model';
import { Account } from './Account.model';

export class Transaction {

  transaction_no:number;
  accountFrom:Account;
  accountTo:Account;
  type:string;
  date:Date;
  amount:number;
  status:string;
  location:string;
  device:Device;
}
