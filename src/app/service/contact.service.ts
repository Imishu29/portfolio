import { Injectable } from '@angular/core';
import { environment } from '../env/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ContactService {

    private apiUrl = environment.apiUrl+`/api/visitors`;

  constructor(private http: HttpClient) { }

  create(data:any){
    return this.http.post(this.apiUrl+`/`,data)
  }
}
