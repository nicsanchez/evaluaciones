import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient) { }

  login(data:any){
    return this.http.post(environment.apiURL+'/login',data);
  }

  getUserInformation(data:any){
    return this.http.post(environment.apiURL+'/user',data);
  }

  logout(data:any){
    return this.http.post(environment.apiURL+'/logout',data);
  }
}
