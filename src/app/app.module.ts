import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MainPageComponent } from './main-page/main-page.component';
import { AppComponent } from './app.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';

import { CriteriasListComponent } from './criterias-list/criterias-list.component';
import { AddSongComponent } from './add-song/add-song.component';
import { PlaylistTableComponent } from './playlist-table/playlist-table.component';
import { MainState } from './store/main.state';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    CriteriasListComponent,
    AddSongComponent,
    PlaylistTableComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([MainState]),
],
  bootstrap: [AppComponent]
})
export class AppModule { }
