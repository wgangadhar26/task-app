import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';

const routes: Routes = [
    { path: 'taskList', component: TasksListComponent },
    { path: 'taskEditor/:id', component: TaskFormComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
