import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, initialState } from './state/task.reducer';
import { TaskService } from './components/services/task.service';
import { setInitialState } from './state/task.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'task-manager';

  constructor(private store: Store<AppState>, private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.store.dispatch(setInitialState({tasks: tasks}));
    });
  }
}
