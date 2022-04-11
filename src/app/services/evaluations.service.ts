import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EvaluationsService {

  public headers = {};
  constructor(private http: HttpClient) {}

  saveAttachments(data:any){
    this.headers = {
      'Authorization': 'Bearer '+localStorage.getItem('token')
    };
    return this.http.post(environment.apiURL+'/evaluations/saveAttachments',data, {headers: this.headers});
  }

  getEvaluations(data:any, page:any){
    return this.http.post(environment.apiURL+'/evaluations/getEvaluations?page='+page,data);
  }

  downloadFileByFilename(data:any){
    return this.http.post(environment.apiURL+'/evaluations/downloadFileByFilename',data);
  }

  downloadFilesByBulkFile(data:any){
    this.headers = {
      'Authorization': 'Bearer '+localStorage.getItem('token')
    };
    return this.http.post(environment.apiURL+'/evaluations/downloadFilesByBulkFile',data, {headers: this.headers});
  }
}
