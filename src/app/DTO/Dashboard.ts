import { SuspectCountPerDayDTO } from './SuspectCountPerDayDTO';
import { TransactionScatterDTO } from './TransactionScatterDTO';

export class Dashboard {
   customerNo:number;
   suspectCount:number;
   suspectCountPerDay:SuspectCountPerDayDTO[];
   transactionScatters:TransactionScatterDTO[];
   countSuspectPerRule:Map<string, number>;
   countSuspectPerAccount:Map<string, number>;
}
