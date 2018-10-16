import { Injectable, Component } from '@angular/core';
import { HttpModule, Request, RequestMethod, Response, RequestOptions, Headers } from '@angular/http';
import { Observable, Subject, ReplaySubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { firstData } from '../models/FirstData';
import { MovieData } from '../models/moviedata';
import { CastModel } from '../models/cast.model';


@Injectable()
export class MoviesService {
  movieData;
  public movieId2Get: number;

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) { }

  getTheData(dataType: string): Observable<firstData[]> {
    return this.http.get<firstData[]>('api/Movies/' + dataType);
  }
  /*
  getMovieData(movieId) {
    this.http.get<any>('api/Movies/GetMovieData/' + movieId).subscribe(response => {
      this.movieData = response;
      this.openSnackBar('movieData:' + this.movieData, '');
    }, err => {
      this.openSnackBar('error:' + err, '');
    });
  }
  */

  getMovieData(movieId): Observable<any> {
    return this.http.get<any>('api/Movies/GetMovieData/' + movieId);
  }

  getmovieCast(): Observable<CastModel[]> {
    return this.http.get<CastModel[]>('api/Movies/GetMovieCast');
  }

  getSearchResults(query): Observable<any> {
    return this.http.get<any>('api/Movies/GetSearchResults/' + query);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
