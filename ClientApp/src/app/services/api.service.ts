import { map, catchError } from 'rxjs/operators';
import { Injectable, Component } from '@angular/core';
import { HttpModule, Http, Request, RequestMethod, Response, RequestOptions, Headers } from '@angular/http';
import { Observable, Subject, ReplaySubject } from 'rxjs';
import { UserData } from '../models/UserData';
import { LoginData } from '../models/loginData';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AuthGuard } from '../guards/auth-guard.service';


@Injectable()
export class ApiService {
  tokenExists;
  gotData;
  public values = [];
  public invalidLogin = false;
  isToken = false;
  myProfileData;
  authChange = new Subject<boolean>();
  serverResponseData: any;

  constructor(private http: HttpClient, private router: Router, public snackBar: MatSnackBar, private authGuard: AuthGuard) {
    if (localStorage.getItem('jwt')) { this.authChange.next(true); }
  }

  getValues() {
    return this.http.get('/api/models').subscribe(res => {
      console.log(res);
    })

  }

  checkToken() {
    if (localStorage.getItem('jwt')) { this.tokenExists = true; this.authSuccessfully(); } else { this.tokenExists = false; }
    return this.tokenExists;
  }

  checktoken1() {
    if (localStorage.getItem('jwt')) { this.tokenExists = true; this.authChange.next(true); } else { this.authChange.next(false); this.tokenExists = false; }
    return this.tokenExists;
  }

  register(user: UserData) {
    let credentials = JSON.stringify(user);
    this.http.post('api/Users/Register', credentials, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe(response => {
      if (response) {
        this.openSnackBar('You have successfully registered', 'login');
        this.router.navigate(["/login"]);
      } else { this.openSnackBar('This email is already registered.', ''); }
    }, err => {
      this.invalidLogin = true;
    });
  }

  login(login: LoginData) {
    let credentials = JSON.stringify(login);
    this.http.post('api/Users/Login', credentials, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe(response => {
      let token = (<any>response).token;
      localStorage.setItem("jwt", token);
      this.invalidLogin = false;
      this.authSuccessfully();
    }, err => {
      this.openSnackBar('Email or Password is incorrect!', '');
      this.invalidLogin = false;
      this.authChange.next(false);
      this.router.navigate(['/login']);
    });
  }

  myProfile(): Observable<any> {
    let token = localStorage.getItem("jwt");
    return this.http.get<any>('api/Users/MyProfile', {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      })
    });
  }

  saveMyProfile(user: UserData): Observable<any> {
    let credentials = JSON.stringify(user);
    let token = localStorage.getItem("jwt");
    return this.http.post<any>('api/Users/SaveMyProfile', credentials, {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      })
    });
  }

  logOut() {
    localStorage.removeItem("jwt");
    this.invalidLogin = false;
    this.authChange.next(false);
    this.router.navigate(['/login']);
    this.openSnackBar('You have successfully logged out', '');
  }

  private authSuccessfully() {
    this.authChange.next(true);
    this.router.navigate(['/movies']);
  }

  getValInfo() {
    return this.invalidLogin;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
