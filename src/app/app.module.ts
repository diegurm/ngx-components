import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
// Add these
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);


import {
  MatAutocompleteModule,
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSelectModule
} from '@angular/material';

import { AppComponent } from './app.component';
import {AutocompleteComponent, HighlightPipe} from './components/autocomplete/autocomplete.component';
import { DropdownListComponent } from './components/dropdown-list/dropdown-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HighlightPipe,
    AutocompleteComponent,
    DropdownListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // Material
    MatSelectModule,
    MatIconModule,

    FontAwesomeModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonModule,

    // Add this
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
