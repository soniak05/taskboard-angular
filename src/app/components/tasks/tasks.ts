import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { TaskFormComponent } from '../task-form/task-form';
import { FormsModule } from '@angular/forms';
import { PriorityFilterPipe } from '../../pipes/priority-filter.pipe';


@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule, TaskFormComponent, PriorityFilterPipe],
  templateUrl: './tasks.html',
  styleUrls: ['./tasks.css']
})
export class TasksComponent {

/** Listado local de tareas */
  tasks: Task[] = [];

  /** Filtro actual de estado */
  filterStatus: 'Todas' | 'Pendiente' | 'Completada' = 'Todas';

  /** Filtro actual de prioridad */
  filterPriority: 'Todas' | 'Alta' | 'Media' | 'Baja' = 'Todas';

  /**
   * Constructor
   * Inicializa el componente e inyecta el servicio de tareas.
   * @param taskService - Servicio para gestionar operaciones de tareas
   */
  constructor(private taskService: TaskService) {
    this.loadTasks(); 
  }

  /**
   * Carga las tareas desde el servicio.
   * Ejecutado después de cualquier cambio en las tareas.
   * Crea una copia del array para detectar cambios.
   */
  loadTasks() {
    this.tasks = [...this.taskService.getTasks()];
  }

  /**
   * Alterna el estado de completitud de una tarea.
   * @param id - ID de la tarea a modificar
   */
  toggleCompleted(id: number) {
    this.taskService.toggleCompleted(id);
    this.loadTasks(); 
  }

  /**
   * Marca o desmarca una tarea como favorita.
   * @param id - ID de la tarea a marcar/desmarcar
   */
  toggleFavorite(id: number) {
    this.taskService.toggleFavorite(id);
    this.loadTasks(); 
  }

  /**
   * Elimina una tarea del listado.
   * @param id - ID de la tarea a eliminar
   */
  deleteTask(id: number) {
    this.taskService.deleteTask(id);
    this.loadTasks(); 
  }

}
