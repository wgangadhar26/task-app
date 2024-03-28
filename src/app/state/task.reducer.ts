// src/app/task.reducer.ts

import { createReducer, on } from '@ngrx/store';
import { Task } from '../components/models/task.interface';
import * as taskActions from './task.actions';

export interface AppState {
  tasks: Task[];
}

export const initialState: AppState = {
  tasks: []
};

export const taskReducer = createReducer(
  initialState,
  on(taskActions.addTask, (state, { task: task }) => ({ ...state, tasks: [...state.tasks, task] })),
  on(taskActions.updateTask, (state, { task: updatedTask}) => ({
    ...state,
    tasks: state.tasks.map(task => {
      if (task.id === updatedTask.id) {
        return task = updatedTask;
      }
      return task;
    })
  })),
  on(taskActions.deleteTask, (state, { id: taskId}) => (
    { ...state, tasks: state.tasks.filter(task => task.id !== taskId) }
  )),
  on(taskActions.setInitialState, (state, {tasks: tasks}) => ({
    ...state, tasks: [...state.tasks, ...tasks]
  }))
);