import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AgGridAngular } from 'ag-grid-angular';
import { DeleteTasksComponent } from './components/tasks-list/delete-tasks/delete-tasks.component';
import { AppRoutingModule } from './app.routing.module';
import { EditTaskComponent } from './components/tasks-list/edit-task/edit-task.component';
import { StoreModule } from '@ngrx/store';
import { taskReducer } from './state/task.reducer';
import { TaskService } from './components/services/task.service';
import { CustomMaterialModule } from './custom-material.module';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import { TaskStatusComponent } from './components/tasks-list/task-status/task-status.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TasksListComponent,
    TaskFormComponent,
    DeleteTasksComponent,
    EditTaskComponent,
    TaskStatusComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    AgGridAngular,
    AppRoutingModule,
    StoreModule.forRoot({tasks: taskReducer}),
    BrowserAnimationsModule,
    CustomMaterialModule,
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
