import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {URL} from "./fake-constants";

@Injectable({
  providedIn: 'root'
})
export class FakeService {

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get(URL);
  }

  createData(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }

    return this.http.post(data, URL, httpOptions);
  }

  methodWithoutCoverage() {
    return null;
  }
}
