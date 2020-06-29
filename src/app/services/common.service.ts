import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class CommonService {

  protected headers = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    }),
    observe: 'response' as 'body'
  };

  private hostName = 'http://jsonplaceholder.typicode.com/';

  constructor(private http: HttpClient) {
  }

  public get(url: string) {
    return this.http.get(`${this.hostName}${url}`, this.headers);
  }

  public post(url: string, data?) {
    return this.http.post(`${this.hostName}${url}`, data, this.headers);
  }

  public put(url: string, data?) {
    return this.http.put(`${this.hostName}${url}`, data, this.headers);
  }

  public delete(url: string, data?) {
    return this.http.delete(`${this.hostName}${url}`, this.headers);
  }
}
