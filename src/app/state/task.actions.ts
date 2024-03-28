// src/app/task.actions.ts

import { createAction, props } from '@ngrx/store';
import { Task } from '../components/models/task.interface';

export const addTask = createAction('[Task] Add Task', props<{ task: Task }>());
export const updateTask = createAction('[Task] Update Task', props<{ task: Task }>());
export const deleteTask = createAction('[Task] Delete Task', props<{ id: Number }>());
export const setInitialState = createAction('[Task] Set Initial State', props<{tasks: Task[]}>());