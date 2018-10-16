import { Component, OnInit, ViewChild } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { MovieData } from '../../models/moviedata';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { CastModel } from '../../models/cast.model';

@Component({
  selector: 'app-getmoviedata',
  templateUrl: './getmoviedata.component.html',
  styleUrls: ['./getmoviedata.component.css']
})
export class GetmoviedataComponent implements OnInit {

  displayedColumns: string[] = ['name', 'character', 'profile_path'];
  dataSource: MatTableDataSource<CastModel>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public castDataList: CastModel[];
  public movieDataList: string[];
  public movieTrailerList: any;
  public trailerValid;

  movieId;
  gotMovieData = false;

  constructor(private movieService: MoviesService, private route: ActivatedRoute) {
    if (this.gotMovieData) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.movieId = params['id'];
    });

    if (this.movieId != 0 || this.movieId != null) {
      this.movieService.getMovieData(this.movieId).subscribe(movieData => {
        this.movieService.getmovieCast().subscribe(castData => {
          this.movieDataList = movieData;
          this.castDataList = castData;

          if (this.movieDataList[13] == 'Unknown') { this.trailerValid = false; } else { this.trailerValid = true; }

          this.dataSource = new MatTableDataSource(this.castDataList);
          this.gotMovieData = true;
        });
      });
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
