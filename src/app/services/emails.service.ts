import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmailsService {
  public headers = {};
  constructor(private http: HttpClient) {}

  storeEmailsByBulkFile(data: any) {
    const token = localStorage.getItem('token');
    this.headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.post(
      `${environment.apiURL}/emails/storeEmailsByBulkFile`,
      data,
      { headers: this.headers }
    );
  }

  sendEvaluationMailToUserByDocument(data: any) {
    return this.http.post(
      `${environment.apiURL}/emails/sendEvaluationMailToUserByDocument`,
      data
    );
  }

  sendEvaluationsMailsToMultipleUsers(data: any) {
    const token = localStorage.getItem('token');
    this.headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.post(
      `${environment.apiURL}/emails/sendEvaluationsMailsToMultipleUsers`,
      data,
      { headers: this.headers }
    );
  }
}
