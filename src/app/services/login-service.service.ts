import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private rol:String = '';

  constructor(private http: HttpClient) { }

  login(data:any){
    return this.http.post(environment.apiURL+'/login',data);
  }

  logout(data:any){
    return this.http.post(environment.apiURL+'/logout',data);
  }

  getPermissions(data:any){
    return this.http.post(environment.apiURL+'/roles/getPermissions',data);
  }

  setGlobalRol(globalRol:String){
    this.rol = globalRol;
  }

  getGlobalRol(){
    return this.rol;
  }

}
