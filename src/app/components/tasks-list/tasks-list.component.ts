import { Component, OnInit } from '@angular/core';
import { ColDef, ITooltipParams, SizeColumnsToFitGridStrategy, SizeColumnsToFitProvidedWidthStrategy,
  SizeColumnsToContentStrategy } from 'ag-grid-community'; // Column Definition Type Interface
import { DeleteTasksComponent } from './delete-tasks/delete-tasks.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/task.reducer';
import { TaskService } from '../services/task.service';
import { TaskStatusComponent } from './task-status/task-status.component';
import { Constants, ErrorMessages } from 'src/app/shared/constants';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {
  tasks: any;
  newTask = false;
  taskToBeUpdated!: Number;
  message: string = ErrorMessages.incompleteAction;
  showErrorMessage: boolean = false;
  public autoSizeStrategy:
    | SizeColumnsToFitGridStrategy
    | SizeColumnsToFitProvidedWidthStrategy
    | SizeColumnsToContentStrategy = {
    type: "fitGridWidth",
    defaultMinWidth: 100,
  };
  createNewTaskButtonText = Constants.createNewTaskButtonText;

  constructor(private store: Store<AppState>, private taskService: TaskService) {
  }

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    {
      field: "title",
      cellRenderer: EditTaskComponent,
      filter: 'agSetColumnFilter',
      minWidth: 300,
      filterParams: {
        comparator: (a: any, b: any) => {
          const valA = parseInt(a);
          const valB = parseInt(b);
          if (valA === valB) return 0;
          return valA > valB ? 1 : -1;
        }
      },
      rowDrag: true, /** This is the property along rowDrag properties 
                    ([rowDragManaged]="true" [suppressMoveWhenRowDragging]="true") 
                    added in HTML to drag the row  */
      tooltipValueGetter: (p: ITooltipParams) => p.value
    },
    {
      field: "description",
      filter: 'agSetColumnFilter',
      minWidth: 350,
      filterParams: {
        comparator: (a: any, b: any) => {
          const valA = parseInt(a);
          const valB = parseInt(b);
          if (valA === valB) return 0;
          return valA > valB ? 1 : -1;
        }
      },
      tooltipValueGetter: (p: ITooltipParams) => p.value // Property to get the value as tooltip
    },
    {
      field: "dueDate",
      filter: 'agSetColumnFilter',
      minWidth: 150,
      filterParams: {
        comparator: (a: any, b: any) => {
          const valA = parseInt(a);
          const valB = parseInt(b);
          if (valA === valB) return 0;
          return valA > valB ? 1 : -1;
        }
      },
      tooltipValueGetter: (p: ITooltipParams) => p.value
    },
    {
      field: "status",
      filter: 'agSetColumnFilter',
      minWidth: 150,
      filterParams: {
        comparator: (a: any, b: any) => {
          const valA = parseInt(a);
          const valB = parseInt(b);
          if (valA === valB) return 0;
          return valA > valB ? 1 : -1;
        }
      },
      cellRenderer: TaskStatusComponent,
      tooltipValueGetter: (p: ITooltipParams) => p.value
    },
    { field: "delete", cellRenderer: DeleteTasksComponent, }
  ];

  ngOnInit(): void {
    this.store.select('tasks').subscribe(tasks => this.tasks = tasks);
    this.taskService.taskId.subscribe(taskId => {
      if (!this.newTask) {
        this.newTask = true;
        this.taskToBeUpdated = taskId;
        this.showErrorMessage = false;
      } else {
        this.showErrorMessage = true;
      }
    })
  }

  /** Methods to hide and show the task form */
  addNewTask() {
    this.newTask = true;
  }

  newTaskCreated($event: any) {
    this.newTask = !$event;
  }
}
