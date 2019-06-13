import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Add these
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

import { AppComponent } from './app.component';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { DropdownListComponent } from './components/dropdown-list/dropdown-list.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AutocompleteComponent,
    DropdownListComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    // Add this
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
