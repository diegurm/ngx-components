import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, startWith, switchMap } from 'rxjs/operators';
import { query } from '@angular/animations';
import { Observable, timer } from 'rxjs';

@Component({
  selector: 'auto-complete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AutocompleteComponent implements OnInit {

  isActive: boolean = false;
  isFiltered: boolean = false;
  isLoading: boolean = false;

  searchCtrl = new FormControl('');
  $itens: Observable<any[]>;

  constructor() {
    this.$itens = this.searchCtrl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(200),
        distinctUntilChanged(),
        switchMap(searchText => {
          return [];
        })
      );
  }

  ngOnInit() {

  }

  onClick() {
    this.isActive = !this.isActive;
  }

}
