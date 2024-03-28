import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-task-status',
  template: `
    {{value}}
  `,
  styles: [
  ]
})
export class TaskStatusComponent implements ICellRendererAngularComp {
  value!: string;
  agInit(params: ICellRendererParams<any, any, any>): void {
    if (params.value === 'notStarted') {
      this.value = 'Not Started';
    } else if (params.value === 'pending') {
      this.value = 'Pending';
    } else if (params.value === 'completed') {
      this.value = 'Completed';
    } else {
      this.value = '';
    }
  }
  refresh(params: ICellRendererParams<any, any, any>): boolean {
    return false;
  }

}
