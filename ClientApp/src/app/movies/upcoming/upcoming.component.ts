import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Subscription } from 'rxjs';
import { firstData } from '../../models/FirstData';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.css']
})
export class UpcomingComponent implements OnInit {
  gotUpcomingData = false;

  public upcomingMoviesList: firstData[];

  constructor(private moviesService: MoviesService, private router: Router) { }

  ngOnInit() {
    this.moviesService.getTheData("Upcoming").subscribe(upcoming => {
      this.upcomingMoviesList = upcoming;
      this.gotUpcomingData = true;
    });
  }

  getMovieData(movieId) {
    if (movieId != 0 || movieId != null) { this.router.navigate(['getmoviedata/' + movieId]); }
  }
}
