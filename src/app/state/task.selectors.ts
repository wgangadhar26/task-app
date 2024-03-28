// src/app/task.selectors.ts

import { createSelector } from '@ngrx/store';
import { AppState } from './task.reducer';

export const selectTasks = (state: AppState) => state.tasks;

export const selectTaskById = (id: Number) =>
  createSelector(selectTasks, tasks => tasks.find(task => task.id === id));