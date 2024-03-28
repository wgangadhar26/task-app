import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-edit-task',
  template: `
    <a (click)="passTaskIdToBeUpdated()">{{value}}</a>
  `,
  styles: [
    `
    a:hover {
      cursor: pointer
    }
    `
  ]
})
export class EditTaskComponent implements ICellRendererAngularComp {
  value!: string;
  id: Number = 0;
  constructor(private taskService: TaskService) {

  }
  agInit(params: ICellRendererParams<any, any, any>): void {
    this.value = params.value;
    this.id = params.data.id;
  }
  refresh(params: ICellRendererParams<any, any, any>): boolean {
    return false
  }
  /** Passing the task Id to populate the task that needs to be updated */
  passTaskIdToBeUpdated() {
    this.taskService.passTaskIdToBeUpdated(this.id);
  }
}
