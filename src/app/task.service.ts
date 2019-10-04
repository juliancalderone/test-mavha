import { Injectable } from '@angular/core';
import { RequestService } from './request.service';
import { Task } from './models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private requestService: RequestService) { }

  createList(title: string) {
    return this.requestService.post('lists', { title });
  }

  getLists() {
    return this.requestService.get('lists');
  }

  getTasks(listId: string) {
    return this.requestService.get(`lists/${listId}/tasks`);
  }

  createTask(title: string, listId: string) {
    return this.requestService.post(`lists/${listId}/tasks`, { title });
  }

  complete(task: Task) {
    return this.requestService.patch(`lists/${task._listId}/tasks/${task._id}`, {
      completed: !task.completed
    });
  }


}
