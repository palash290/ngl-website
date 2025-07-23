import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  baseUrl = 'https://13.61.168.187:4000/api/';;

  adminUrl = 'https://13.61.168.187:4000/admin/'

  constructor(private http: HttpClient, private router: Router) { }


  get<T>(url: string): Observable<T> {
    return this.http.get<T>(this.baseUrl + url);
  };


  getApi1(url: any): Observable<any> {
    return this.http.get(url)
  }

  getAdmin<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  };

  postAPI<T, U>(url: string, data: U): Observable<T> {
    const authToken = localStorage.getItem('austriaToken');
    const header = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${authToken}`
    })
    return this.http.post<T>(this.baseUrl + url, data, { headers: header })
  };

  postAPI1<T, U>(url: string, data: U): Observable<T> {
    return this.http.post<T>(url, data)
  };


  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(this.baseUrl + url);
  };

  setToken(token: string) {
    localStorage.setItem('austriaToken', token)
  }

  getToken() {
    return localStorage.getItem('austriaToken')
  }

  isLogedIn() {
    return this.getToken() !== null
  }

  logout() {
    localStorage.removeItem('austriaToken');
    localStorage.removeItem('cityFrom');
    localStorage.removeItem('cityFromId');
    localStorage.removeItem('cityTo');
    localStorage.removeItem('cityToId');
    localStorage.removeItem('date1');
    localStorage.removeItem('guestuser');
  }


}
