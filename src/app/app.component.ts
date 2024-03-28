import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, initialState } from './state/task.reducer';
import { TaskService } from './components/services/task.service';
import { setInitialState } from './state/task.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'task-manager';
  isNavigatedToTaskList = false;

  constructor(private store: Store<AppState>, private taskService: TaskService, private router: Router) {
  }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.store.dispatch(setInitialState({tasks: tasks}));
    });
  }

  navigateToTaskList() {
    this.isNavigatedToTaskList = true;
    this.router.navigate(['/taskList']);
  }
}
