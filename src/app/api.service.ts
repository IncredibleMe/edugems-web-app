import {Injectable, Output, EventEmitter} from "@angular/core";
import {Http, Response, RequestOptions, Headers} from "@angular/http";
import {environment} from "../environments/environment";
import "rxjs/add/operator/map";

@Injectable()
export class ApiService {

  @Output() loggedInEmit: EventEmitter<any> = new EventEmitter();
  public loggedIn;
  private apiLogin = environment.apiURL + '/auth/login';
  private apiRegister = environment.apiURL + '/auth/register';
  success; // Added to suppress an error. Need further investigation.

  constructor(private http: Http) {
    this.loggedIn = !!localStorage.getItem('token');
  }

  login(form: any) {
    let body = JSON.stringify(form);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.post(this.apiLogin, body, options)
      .map(this.extractData)
      .map((response) => {
          if (response.success) {
            localStorage.setItem('token', response.token);
            this.loggedIn = true;
            this.loggedInEmit.emit(true);
          }
          return response.success;
        },
        error => {
          console.log(error.text());
        }
      );
  }

  register(form: any) {
    let body = JSON.stringify(form);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.post(this.apiRegister, body, options)
      .map(this.extractData);
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn = false;
    this.loggedInEmit.emit(false);
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  getEmittedValue() {
    return this.loggedInEmit;
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

}
