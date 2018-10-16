import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Subscription } from 'rxjs';
import { firstData } from '../../models/FirstData';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nowplaying',
  templateUrl: './nowplaying.component.html',
  styleUrls: ['./nowplaying.component.css']
})
export class NowplayingComponent implements OnInit {
  nowPlayingMovies: any;
  nowPlayingDataSubs: Subscription;
  gotNowPlayingData = false;

  public nowPlayingList: firstData[];

  constructor(private moviesService: MoviesService, private router: Router) { }

  ngOnInit() {
    this.moviesService.getTheData("NowPlaying").subscribe(data => {
      this.nowPlayingList = data;
      this.gotNowPlayingData = true;
    });
  }

  getMovieData(movieId) {
    if (movieId != 0 || movieId != null) { this.router.navigate(['getmoviedata/' + movieId]); }
  }
}
