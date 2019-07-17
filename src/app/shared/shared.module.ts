import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatDividerModule,
  MatProgressBarModule
} from '@angular/material';

// Add these
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);


@NgModule({
  imports: [
    CommonModule,

    FontAwesomeModule,

    MatSelectModule,
    MatIconModule,
    MatAutocompleteModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatButtonModule,
    MatDividerModule
  ],
  declarations: [],
  exports: [
    FontAwesomeModule,

    MatSelectModule,
    MatIconModule,
    MatAutocompleteModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatButtonModule,
    MatDividerModule
  ]
})
export class SharedModule { }
