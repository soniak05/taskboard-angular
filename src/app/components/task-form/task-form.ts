import { Component,Output, EventEmitter } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';



@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.html',
  styleUrls: ['./task-form.css']
})
export class TaskFormComponent {
  /** Evento emitido cuando se añade una nueva tarea */
  @Output() taskAdded = new EventEmitter<void>();
  
  /** Título de la nueva tarea */
  title: string = '';

  /** Prioridad de la nueva tarea */
  priority: 'Alta' | 'Media' | 'Baja' | '' = '';

  /** Constructor que inyecta el servicio de tareas */
  constructor(private taskService: TaskService) {}

  /**
   * Maneja el envío del formulario de nueva tarea.
   * Valida que la prioridad esté seleccionada, crea la tarea,
   * emite el evento taskAdded y resetea el formulario.
   * @param form - Referencia al formulario NgForm
   */
  onSubmit(form: NgForm) {
    // Valida que se haya seleccionado una prioridad y el título no esté vacío
    if (!this.priority || !this.title || !this.title.trim()) {
      // Marca controles como tocados para que los mensajes de error se muestren
      try {
        form.control.markAllAsTouched();
      } catch (e) {
        // en caso de que no haya control, ignorar
      }
      return;
    }

    // Añade la nueva tarea usando el servicio
    this.taskService.addTask({
      title: this.title.trim(),
      priority: this.priority as 'Alta' | 'Media' | 'Baja',
      completed: false,
      favorite: false
    });

    // Emite el evento para notificar que se ha añadido una tarea
    this.taskAdded.emit();

    // Limpia los campos del formulario
    this.title = '';
    this.priority = '';
    form.resetForm();
  }
}