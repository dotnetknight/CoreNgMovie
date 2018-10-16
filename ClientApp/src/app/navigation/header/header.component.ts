import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { WelcomeComponent } from '../../welcome/welcome.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();

  public isAuth = false;
  authSubscription: Subscription;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    if (this.apiService.checktoken1()) { this.isAuth = true; } else { this.isAuth = false; }
    this.authSubscription = this.apiService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.apiService.logOut();
  }
}
