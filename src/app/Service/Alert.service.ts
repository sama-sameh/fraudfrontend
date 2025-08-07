import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Alert } from '../Models/Alert.model';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private baseUrl= environment.apiUrl+'/alerts';
  constructor(private http: HttpClient) { }
  getAllAlerts(){
    return this.http.get<Alert[]>(`${this.baseUrl}/all`);
  }

  updateAlert(selectedALert: Alert) {
    return this.http.post(this.baseUrl+'/update',selectedALert);
  }
}
