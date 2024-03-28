import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ConfirmDialogComponent, ConfirmDialogModel } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { deleteTask } from 'src/app/state/task.actions';
import { AppState } from 'src/app/state/task.reducer';

@Component({
  selector: 'app-delete-tasks',
  template: `<button (click)="handleClickEvent($event)"><i class="fas fa-trash-alt"></i></button>`,
  styles: []
})
export class DeleteTasksComponent implements ICellRendererAngularComp, OnInit {
  id: Number = 0;
  tasks: any;
  
  constructor(private store: Store<AppState>, public dialog: MatDialog) {    
  }
  
  ngOnInit(): void {
    this.store.select('tasks').subscribe(tasks => this.tasks = tasks);
  }

  agInit(params: ICellRendererParams<any, any, any>): void {
    this.id = params.data.id;
  }
  refresh(params: ICellRendererParams<any, any, any>): boolean {
    return false;
  }

  handleClickEvent($event: Event) {
    const message = `Are you sure you want to delete this Task?`;

    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.store.dispatch(deleteTask({id: this.id}))
      }
    });
  }
}
