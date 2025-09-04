import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { PredictionDTO } from '../DTO/PredictionDTO';

@Injectable({
  providedIn: 'root'
})
export class PredicationService {
  private baseUrl= environment.apiUrl+'/prediction';
  constructor(private http: HttpClient) { }
  getPredication(predicationIds:number[]){
    return this.http.post<PredictionDTO[]>(`${this.baseUrl}/xgboost`, predicationIds);
  }
}
