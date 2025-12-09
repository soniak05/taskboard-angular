import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
/**
 * TaskService - Gestiona todas las operaciones CRUD de tareas.
 * Almacena tareas en memoria con métodos para crear, leer, actualizar y eliminar.
 */
export class TaskService {

  /** Array privado que almacena las tareas */
  private tasks: Task[] = [
    {
      id: 1,
      title: 'Ejemplo de tarea',
      priority: 'Media',
      completed: false,
      favorite: false
    }
  ];

  /** Contador interno para generar IDs únicos */
  private nextId = 2;

  constructor() {}

  /**
   * Obtiene todas las tareas almacenadas.
   * @returns Array de todas las tareas
   */
  getTasks(): Task[] {
    return this.tasks;
  }

  /**
   * Añade una nueva tarea al listado.
   * Asigna automáticamente un ID único incremental.
   * @param task - Objeto tarea sin ID (se genera automáticamente)
   */
  addTask(task: Omit<Task, 'id'>): void {
    this.tasks.push({
      id: this.nextId++,
      ...task
    });
  }

  /**
   * Elimina una tarea por su ID.
   * Filtra el array para remover la tarea coincidente.
   * @param id - ID de la tarea a eliminar
   */
  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  /**
   * Alterna el estado de completitud de una tarea.
   * Si está completada, la marca como pendiente y viceversa.
   * @param id - ID de la tarea a modificar
   */
  toggleCompleted(id: number): void {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
    }
  }

  /**
   * Alterna el estado de favorito de una tarea.
   * Si está marcada como favorita, la desmarca y viceversa.
   * @param id - ID de la tarea a marcar/desmarcar como favorita
   */
  toggleFavorite(id: number): void {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.favorite = !task.favorite;
    }
  }
}
