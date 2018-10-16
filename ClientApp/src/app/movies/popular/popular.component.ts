import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Subscription } from 'rxjs';
import { firstData } from '../../models/FirstData';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.css']
})
export class PopularComponent implements OnInit {
  gotPopularData = false;

  public popularMoviesList: firstData[];

  constructor(private moviesService: MoviesService, private router: Router) { }

  ngOnInit() {
    this.moviesService.getTheData("Popular").subscribe(popular => {
      this.popularMoviesList = popular;
      this.gotPopularData = true;
    });
  }
  getMovieData(movieId) {
    if (movieId != 0 || movieId != null) { this.router.navigate(['getmoviedata/' + movieId]); }
  }
}
