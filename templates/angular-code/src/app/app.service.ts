import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AppService {
  readonly getPredictSalaryUrl = environment.predictionUrl;

  constructor(private http:HttpClient) { }

  getPrediction(obj:any){
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json;charset=UTF-8');
    return this.http.post<any[]>(this.getPredictSalaryUrl, obj, { headers: header });
  }
}
