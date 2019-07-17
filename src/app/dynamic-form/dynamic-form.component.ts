import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dynamic-form',
  template: `<form class="dynamic-form" [formGroup]="form"></form>`
})
export class DynamicFormComponent implements OnInit {

  @Input()
  config: any[] = [];

  form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({});
    this.config.forEach((control) => this.form.addControl(control.name, this.fb.control()));
  }

  ngOnInit() {
  }

}
