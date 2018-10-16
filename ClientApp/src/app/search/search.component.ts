import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { firstData } from '../models/FirstData';
import { Router } from '@angular/router';
import { Subject, Observable, of } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, flatMap, map, tap } from 'rxjs/operators';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  name: string;

  public keyUp = new Subject<string>();


  public gotSearchData = false;
  public searchDataList: firstData[];
  public gettingData = false;
  searchVal: any;

  constructor(private movieService: MoviesService, private router: Router) {
    const subscription = this.keyUp.pipe(
      map(event => this.name = event),
      debounceTime(200),
      distinctUntilChanged(),
      flatMap(search => of(search).pipe(delay(200)))
    ).subscribe(() => { this.search(this.name); this.gettingData = true; });
  }

  ngOnInit() {
  }

  search(query: string) {
    this.movieService.getSearchResults(query).subscribe(data => {
      this.searchDataList = data;
      this.gotSearchData = true;
      this.gettingData = false;
    });

    setTimeout(() => {
      console.log("q1:" + query);
    }, 1300);
  }


  searchService(query) {
    this.movieService.getSearchResults(query).subscribe(data => {
      this.searchDataList = data;
      this.gotSearchData = true;
      this.gettingData = false;
    });
  }

  getMovieData(movieId) {
    if (movieId != 0 || movieId != null) { this.router.navigate(['getmoviedata/' + movieId]); }
  }
}
