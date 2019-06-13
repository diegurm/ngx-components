import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { fromEvent} from 'rxjs';

@Component({
  selector: 'dropdown-list',
  templateUrl: './dropdown-list.component.html',
  styleUrls: ['./dropdown-list.component.scss']
})
export class DropdownListComponent implements OnInit {

  @ViewChild('dropdownList') dropdownList: ElementRef;

  @Input()
  label: string;
  @Input()
  required: boolean;

  @Input()
  data: any[];

  focus = false;

  constructor() {
  }

  ngOnInit() {
    fromEvent(this.dropdownList.nativeElement, 'focus').subscribe((el) => {
      console.log(el);
      this.focus = true;
    });
  }


  setMyStyles() {
    let styles = {
      'background-color': this.focus ? 'red' : 'transparent',
      'font-weight': this.focus ? 'bold' : 'normal'
    };
    return this.focus ? styles : {};
  }
}
