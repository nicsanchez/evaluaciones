import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  constructor(private http: HttpClient) {}

  getLogs(data:any, page:any){
    return this.http.post(environment.apiURL+'/logs/getLogs?page='+page,data);
  }
}
