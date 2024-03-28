import { Observable, Subject, of } from "rxjs";
import { Task } from "../models/task.interface";

export class TaskService {
    taskId: Subject<Number> = new Subject<Number>();

    getTasks(): Observable<Task[]> {
        return of([
            {
                id: 101,
                title: 'Complete the assignment',
                description: 'Complete the assignment on time and you will get rewards',
                dueDate: '2024-05-24',
                status: 'inProgress'
            },
            {
                id: 102,
                title: 'Building an Operations and Training plan',
                description: 'Create a robust training plan',
                dueDate: '2024-04-25',
                status: 'inProgress'
            }
        ])
    }

    passTaskIdToBeUpdated(id: Number) {
        this.taskId.next(id);
    }
}