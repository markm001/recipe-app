import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from "../data-storage.service";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  title = 'Recipe Application'
  subscription!: Subscription
  isAuthenticated: boolean = false

  constructor(private data:DataStorageService, private authService:AuthService) { }

  ngOnInit(): void {
    this.subscription = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user
    });
  }

  onSaveData() {
    this.data.saveData()
  }

  onFetchData() {
    this.data.fetchData().subscribe()
  }

  onLogout() {
    this.authService.logout()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
