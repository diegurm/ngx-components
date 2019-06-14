import { Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { fromEvent } from 'rxjs';

// @ts-ignore
@Component({
  selector: 'dropdown-list',
  templateUrl: './dropdown-list.component.html',
  styleUrls: ['./dropdown-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DropdownListComponent implements OnInit {

  @Input()
  controlName: string;

  @Input()
  label: string;

  @Input()
  required: boolean;

  @Input()
  options: any[];

  constructor() {
  }

  ngOnInit() {
  }
}
