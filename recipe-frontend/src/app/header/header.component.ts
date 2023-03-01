import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from "../data-storage.service";
import {AuthService} from "../auth/auth.service";
import {map, pipe, Subscription, take} from "rxjs";
import {Store} from "@ngrx/store";
import * as fromApp from "../store/app.reducer"

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  title = 'Recipe Application'
  subscription!: Subscription
  isAuthenticated: boolean = false

  constructor(private data:DataStorageService,
              private authService:AuthService,
              private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.subscription = this.store.select('auth')
      .pipe( map( authState =>  authState.user) )
      .subscribe(
      (user) => {
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
