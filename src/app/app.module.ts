import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './pages/list/list.component';
import { CreateComponent } from './pages/create/create.component';
import { EditComponent } from './pages/edit/edit.component';
import { DetailsComponent } from './pages/details/details.component';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { SortPipe } from './pipes/sort.pipe';

import { DragonsApiService } from './services/dragonsApi/dragons-api.service';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CreateComponent,
    DetailsComponent,
    EditComponent,
    SortPipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    DragonsApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
