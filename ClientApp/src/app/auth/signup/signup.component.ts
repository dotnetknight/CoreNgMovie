import { UserData } from './../../models/UserData';
import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { retry } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate;
  errorMessage: any;
  public userData: UserData;
  returnedData;
  gotDataVal;

  constructor(private apiService: ApiService, private _router: Router) { }

  ngOnInit() {
    this.gotDataVal = true;
    this.userData;
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);

    if (this.apiService.checkToken()) { this._router.navigate(['/movies']); } else { this._router.navigate(['/signup']); }

  }

  save(form: NgForm) {
    this.apiService.invalidLogin = false;
    this.apiService.register(form.value);
    this.gotDataVal = this.apiService.invalidLogin;
  }
}
