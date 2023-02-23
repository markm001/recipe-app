import {Component} from '@angular/core';
import {DataStorageService} from "../data-storage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  title = 'Recipe Application'

  constructor(private data:DataStorageService) { }

  onSaveData() {
    this.data.saveData()
  }

  onFetchData() {
    this.data.fetchData().subscribe()
  }
}
