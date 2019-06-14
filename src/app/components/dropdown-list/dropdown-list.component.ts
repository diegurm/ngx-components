import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {DropDownList, EnumControlType} from '../component';

// @ts-ignore
@Component({
  selector: 'dropdown-list',
  templateUrl: './dropdown-list.component.html',
  styleUrls: ['./dropdown-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DropdownListComponent extends DropDownList implements OnInit {

  constructor() {
    super();

    this.type = EnumControlType.TDropDownList;
  }

  ngOnInit() {
  }
}
