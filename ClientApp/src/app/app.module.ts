import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { ApiService } from './services/api.service';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { MoviesComponent } from './movies/movies.component';
import { NowplayingComponent } from './movies/nowplaying/nowplaying.component';
import { UpcomingComponent } from './movies/upcoming/upcoming.component';
import { PopularComponent } from './movies/popular/popular.component';
import { ValuesComponent } from "./values/values.component";
import { MoviesService } from './services/movies.service';
import { MyprofileComponent } from './auth/myprofile/myprofile.component';
import { GetmoviedataComponent } from './movies/getmoviedata/getmoviedata.component';
import { SafePipe } from './guards/safe.pipe';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    SafePipe, 
    SignupComponent,
    LoginComponent,
    HeaderComponent,
    SidenavListComponent,
    WelcomeComponent,
    MoviesComponent,
    NowplayingComponent,
    UpcomingComponent,
    PopularComponent,
    ValuesComponent,
    MyprofileComponent,
    GetmoviedataComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    HttpModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [ApiService, MoviesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
