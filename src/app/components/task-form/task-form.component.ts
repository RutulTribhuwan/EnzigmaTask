import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-task-form',
  standalone: false,
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {


  taskForm!: FormGroup;
  isEditMode = false;
  taskId!: number;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService 
  ) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      assignedTo: ['', Validators.required],
      status: ['', Validators.required],
      dueDate: ['', Validators.required],
      priority: ['', Validators.required],
     description: ['']
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.taskId = +idParam;

      this.taskService.getTaskById(this.taskId).subscribe({
        next: task => {
          this.taskForm.patchValue(task);
        },
        error: () => {
          this.notificationService.show('Error loading task data!');
        }
      });
    }
  }

  onSubmit(): void {
    if (this.taskForm.invalid) return;

    const taskData = this.taskForm.value;

    if (this.isEditMode) {
      this.taskService.updateTask(this.taskId, taskData).subscribe({
        next: () => {
          this.notificationService.show('Task updated successfully!');
          this.router.navigate(['/']);
        },
        error: () => {
          this.notificationService.show('Failed to update task!');
        }
      });
    } else {
      this.taskService.addTask(taskData).subscribe({
        next: () => {
          this.notificationService.show('Task added successfully!');
          this.router.navigate(['/']);
        },
        error: () => {
          this.notificationService.show('Failed to add task!');
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }



}
