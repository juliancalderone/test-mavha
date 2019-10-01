import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  readonly URL;

  constructor(private http: HttpClient) {
    this.URL = 'http://localhost:3000';
   }

   get(uri: string) {
     return this.http.get(`${this.URL}/${uri}`);
   }

  post(uri: string, body: Object) {
    return this.http.post(`${this.URL}/${uri}`, body);
  }

  patch(uri: string, body: Object) {
    return this.http.patch(`${this.URL}/${uri}`, body);
  }

  delete(uri: string) {
    return this.http.delete(`${this.URL}/${uri}`);
  }

}
