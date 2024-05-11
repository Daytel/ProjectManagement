import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { CommandsComponent } from './pages/commands/commands.component';
import { Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const root: Routes = [
  {path: '', component: AppComponent},
  {path: 'tasks/:name', component: TasksComponent},
  {path: 'command', component: CommandsComponent},
  {path: '**', component: NotFoundComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    CommandsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
