import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserData } from '../../models/UserData';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {
  public myProfData: any;
  public gotData = false;
  public myProfileList: UserData[];

  constructor(private http: HttpClient, private apiService: ApiService) { }

  ngOnInit() {
    let token = localStorage.getItem("jwt");
    this.http.get<any>('api/Users/MyProfile', {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      })
    }).subscribe(response => {
      this.myProfileList = response;
      this.gotData = true;
    }, err => {
      console.log(err)
    });
  }
  save(form: NgForm) {
    this.gotData = false;
    this.apiService.saveMyProfile(form.value).subscribe(res => {
      this.myProfileList = res;
      this.gotData = true;
      this.apiService.openSnackBar('Your data were successfully updated', '');
    });
  }
}
