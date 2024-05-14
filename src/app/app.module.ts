import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TasksComponent } from '../pages/tasks/tasks.component';
import { CommandsComponent } from '../pages/commands/commands.component';
import { NotFoundComponent } from '../pages/not-found/not-found.component';
import { DataService } from 'src/service/senddata.servive';
import { DatePipe } from '../pipes/date.pipe';
import { ProjectComponent } from '../pages/project/project.component';
import { RouterModule, Routes } from '@angular/router';

const roots: Routes = [
  {path: '', component: ProjectComponent},
  {path: 'tasks', component: TasksComponent},
  {path: 'commands', component: CommandsComponent},
  {path: '**', component: NotFoundComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    CommandsComponent,
    DatePipe,
    ProjectComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(roots),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
