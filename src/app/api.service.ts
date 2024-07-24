import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
     providedIn: 'root'
})
export class ApiService {

     constructor(public http: HttpClient,) { }

     createData(body: FormData) {
          var header = new HttpHeaders({
               'Access-Control-Allow-Origin': '*',
          });
          return this.http.request('POST', 'http://localhost:5000/api', { body, headers: header })
     }

     getAllData() {
          var header = new HttpHeaders({
               'Content-Type': 'application/json',
               'Access-Control-Allow-Origin': '*',
          });
          return this.http.request('GET', 'http://localhost:5000/api', { headers: header })
     }

     getById(id:any) {
          var header = new HttpHeaders({
               'Access-Control-Allow-Origin': '*',
          });
          return this.http.request('GET', `http://localhost:5000/api/${id}`, { headers: header })
     }

     deleteData(body: any) {
          var header = new HttpHeaders({
               'Content-Type': 'application/json',
               'Access-Control-Allow-Origin': '*',
          });
          return this.http.request('DELETE', 'http://localhost:5000/api', { body, headers: header })
     }
}
