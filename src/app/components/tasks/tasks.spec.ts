import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.html',
  styleUrls: ['./tasks.css'],
  imports: [CommonModule, RouterLink],
})
export class TaskComponent {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {
    this.loadTasks();
  }

  loadTasks(): void {
    this.tasks = this.taskService.getTasks();
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id);
    this.loadTasks();
  }

  toggleCompleted(id: number): void {
    this.taskService.toggleCompleted(id);
    this.loadTasks();
  }

  toggleFavorite(id: number): void {
    this.taskService.toggleFavorite(id);
    this.loadTasks();
  }
}
