import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../model/task';

@Component({
  selector: 'app-edit-task',
  standalone: false,
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css'
})
export class EditTaskComponent {


 taskForm!: FormGroup;
  taskId!: number;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.taskId = +this.route.snapshot.paramMap.get('id')!; 
    console.log('Editing task with ID:', this.taskId); 
    this.loadTask();
  }

  loadTask(): void {
    this.taskService.getTaskById(this.taskId).subscribe(
      (task) => {
        if (task) {
          console.log('Fetched task:', task); 

          this.taskForm = this.fb.group({
            assignedTo: [task.assignedTo, Validators.required],
            status: [task.status, Validators.required],
            dueDate: [task.dueDate, Validators.required],
            priority: [task.priority, Validators.required],
            description: [task.description, Validators.required]
          });
        } else {
          console.error('Task data is missing or invalid');
        }
      },
      (error) => {
        console.error('Failed to fetch task', error); 
      }
    );
  }

  onSubmit(): void {
    if (this.taskForm.valid) {

      const updatedTask: Task = { id: this.taskId, ...this.taskForm.value };

      this.taskService.updateTask(this.taskId, updatedTask).subscribe(() => {
        this.router.navigate(['/']); 
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/']); 
  }


}
