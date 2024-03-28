import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatOptionSelectionChange } from '@angular/material/core';
import { Store } from '@ngrx/store';
import { addTask, updateTask } from 'src/app/state/task.actions';
import { Task } from 'src/app/components/models/task.interface';
import { AppState } from 'src/app/state/task.reducer';
import { Constants, ErrorMessages, Statusses } from 'src/app/shared/constants';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit, OnDestroy {
  @Input() taskId!: Number;
  btntask: string = Constants.createButtonText;
  title!: string;
  description!: string;
  dueDate!: string | null;
  status!: string;
  statuses = Statusses;
  errorMessage!: string;
  isValid: boolean = false;

  @Output() hideTaskForm = new EventEmitter();

  tasks: any;

  constructor(private store: Store<AppState>) {
    this.store.select('tasks').subscribe(tasks => this.tasks = tasks);
  }

  ngOnInit(): void {
    if (!this.taskId) {
      this.title = '';
      this.description = '';
      this.dueDate = null;
      this.status = Statusses[0].key;
    } else {
      this.title = this.tasks.tasks.filter((task: any) => task.id === this.taskId)[0].title;
      this.description = this.tasks.tasks.filter((task: any) => task.id === this.taskId)[0].description;
      this.dueDate = this.tasks.tasks.filter((task: any) => task.id === this.taskId)[0].dueDate;
      this.status = this.tasks.tasks.filter((task: any) => task.id === this.taskId)[0].status;
      this.btntask = this.taskId ? Constants.updateButtonText : Constants.createButtonText;
    }
  }

  changeStatus($event: MatOptionSelectionChange<string>) {
    this.status = $event.source.value;
  }

  onSubmit() {
    this.validateForm();
    if (this.isValid) {
      if (!this.taskId) {
        const newTask: Task = {
          id: (this.tasks?.length | 0) + 1,
          title: this.title,
          description: this.description,
          dueDate: this.dueDate,
          status: this.status
        }
        this.store.dispatch(addTask({task: newTask}));
      } else {
        const task: Task = {
          id: this.taskId,
          title: this.title,
          description: this.description,
          dueDate: this.dueDate,
          status: this.status
        }
        this.updateTask(task);
      }
      this.hideTaskForm.emit(true);
    }
  }

  cancel() {
    this.hideTaskForm.emit(true);
  }

  validateForm() {
    if (!this.title || !this.dueDate) {
      this.errorMessage = ErrorMessages.incompleteData;
      this.isValid = false;
    } else if (!this.taskId) {
      const taskAlreadyExists = this.tasks.tasks.find((task: Task) => 
        task.title === this.title &&
        task.status !== Statusses[2].key
      )
      if (taskAlreadyExists) {
        this.errorMessage = ErrorMessages.taskAlreadyExists;
        this.isValid = false;
      } else {
        this.isValid = true;
      }
    }
    return this.isValid;
  }

  updateTask(task: Task) {
    this.store.dispatch(updateTask({ task: task }));
  }

  ngOnDestroy(): void {
    this.taskId = 0;
  }
}
