import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SignupComponent } from "./auth/signup/signup.component";
import { LoginComponent } from "./auth/login/login.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { MoviesComponent } from "./movies/movies.component";
import { AuthGuard } from "./guards/auth-guard.service";
import { ValuesComponent } from "./values/values.component";
import { MyprofileComponent } from "./auth/myprofile/myprofile.component";
import { GetmoviedataComponent } from "./movies/getmoviedata/getmoviedata.component";
import { SearchComponent } from "./search/search.component";


const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'movies', component: MoviesComponent, },
  { path: 'getmoviedata/:id', component: GetmoviedataComponent },
  { path: 'search', component: SearchComponent },
  { path: 'myprofile', component: MyprofileComponent, canActivate: [AuthGuard] },
  { path: 'values', component: ValuesComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
