import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../Models/Transaction.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private baseUrl= environment.apiUrl+'/transaction';
  constructor(private http: HttpClient) { }
  makeTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.baseUrl+'/make',transaction);
  }
  runRules(rulesId:number[]){
    return this.http.post(`${this.baseUrl}/run`,rulesId);
  }
  getAllTransactions(){
    return this.http.get<Transaction[]>(`${this.baseUrl}/all`);
  }
}
