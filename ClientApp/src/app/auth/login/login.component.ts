import { Component, OnInit, OnDestroy, Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

@Injectable()
export class LoginComponent implements OnInit {
  gotDataVal;
  authSubscription: Subscription;
  
  constructor(private apiService: ApiService, private _router: Router) { }

  ngOnInit() {
    this.gotDataVal = false;
    if (this.apiService.checkToken()) { this._router.navigate(['/movies']); } else { this._router.navigate(['/login']); }
  }

  login(form: NgForm) {
    this.gotDataVal = true;
    this.apiService.login(form.value);
    this.authSubscription = this.apiService.authChange.subscribe(authStatus => {
      this.gotDataVal = authStatus;
    });
  }
}
