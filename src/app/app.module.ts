import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TasksComponent } from '../pages/tasks/tasks.component';
import { CommandsComponent } from '../pages/commands/commands.component';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../pages/not-found/not-found.component';
import { FileService } from 'src/service/handitem.service';
import { DataService } from 'src/service/senddata.servive';
import { DatePipe } from '../pipes/date.pipe';

const root: Routes = [
  {path: 'tasks/:name', component: TasksComponent},
  {path: 'command', component: CommandsComponent},
  {path: '**', component: NotFoundComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    CommandsComponent,
    DatePipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(root),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    FileService,
    DataService
  ],
  bootstrap: [
    AppComponent,
    TasksComponent,
    CommandsComponent,
    NotFoundComponent
  ]
})
export class AppModule { }
