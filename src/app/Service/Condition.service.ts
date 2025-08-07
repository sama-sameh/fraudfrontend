import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Condition } from '../Models/Condition.model';

@Injectable({
  providedIn: 'root'
})
export class ConditionService {
  private baseUrl= environment.apiUrl+'/conditions';
  constructor(private http: HttpClient) { }
  addCondition(condition: Condition) {
    return this.http.post(this.baseUrl+'/add',condition);
  }
  getConditions(){
    return this.http.get<Condition[]>(`${this.baseUrl}/all`);
  }
  getConditionByRule(ruleId: number) {
    return this.http.get<Condition[]>(`${this.baseUrl}/conditionsbyrule/${ruleId}`);
  }
  deleteConditionById(conditionId:number){
    return this.http.delete<Condition>(`${this.baseUrl}/delete/${conditionId}`);
  }
}
