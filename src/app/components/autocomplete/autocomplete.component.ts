import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, startWith, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AutoComplete } from '../component';


@Component({
  selector: 'auto-complete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AutocompleteComponent extends AutoComplete implements OnInit {
  isLoading: boolean = false;

  searchCtrl = new FormControl('');
  $itens: Observable<any[]>;

  constructor() {
    super();
  }

  ngOnInit() {
    this.$itens = this.control.valueChanges
      .pipe(
        startWith(''),
        debounceTime(200),
        distinctUntilChanged(),
        switchMap(searchText => {
          return [];
        })
      );
  }

}
