import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getUsers(data: any, page: any) {
    return this.http.post(
      `${environment.apiURL}/users/getUsers?page=${page}`,
      data
    );
  }

  createUser(data: any) {
    return this.http.post(`${environment.apiURL}/users/createUser`, data);
  }

  deleteUser(data: any) {
    return this.http.post(`${environment.apiURL}/users/deleteUser`, data);
  }

  updateUser(data: any) {
    return this.http.post(`${environment.apiURL}/users/updateUser`, data);
  }

  updatePersonalData(data: any) {
    return this.http.post(
      `${environment.apiURL}/users/updatePersonalData`,
      data
    );
  }

  getUser(data: any) {
    return this.http.post(`${environment.apiURL}/users/getUser`, data);
  }
}
