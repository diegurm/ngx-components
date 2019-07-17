import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AutocompleteComponent, HighlightPipe } from './components/autocomplete/autocomplete.component';
import { DropdownListComponent } from './components/dropdown-list/dropdown-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    AppComponent,
    HighlightPipe,
    AutocompleteComponent,
    DropdownListComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
