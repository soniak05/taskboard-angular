import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task.model';

/**
 * Pipe para filtrar tareas por estado y prioridad.
 * Aplica ambos filtros simultáneamente.
 */
@Pipe({
  name: 'priorityFilter',
  standalone: true
})
export class PriorityFilterPipe implements PipeTransform {
  /**
   * Transforma un array de tareas aplicando filtros de estado y prioridad.
   * @param tasks - Array de tareas a filtrar
   * @param statusFilter - Criterio de estado ('Todas', 'Pendiente' o 'Completada')
   * @param priorityFilter - Criterio de prioridad ('Todas', 'Alta', 'Media' o 'Baja')
   * @returns Array de tareas que cumplen ambos criterios de filtrado
   */
  transform(tasks: Task[], statusFilter: string, priorityFilter: string): Task[] {
    if (!tasks) return [];

    // Filtra las tareas según los criterios proporcionados
    return tasks.filter(task => {
      // Evalúa si el estado de la tarea coincide con el filtro seleccionado
      const statusMatch =
        statusFilter === 'Todas' ||
        (statusFilter === 'Pendiente' && !task.completed) ||
        (statusFilter === 'Completada' && task.completed);

      // Evalúa si la prioridad de la tarea coincide con el filtro seleccionado
      const priorityMatch = priorityFilter === 'Todas' || task.priority === priorityFilter;

      // La tarea debe cumplir ambos criterios para ser incluida
      return statusMatch && priorityMatch;
    });
  }
}
