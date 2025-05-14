import { Component } from '@angular/core';
import { Task } from '../../model/task';
import { TaskService } from '../../services/task.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  standalone: false,
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {


 tasks: Task[] = [];
  pagedTasks: Task[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  showDialog: boolean = false;
  selectedTaskName: string = '';

  constructor(private taskService: TaskService, public dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
      this.totalPages = Math.ceil(this.tasks.length / 5); 
      this.setPage(1); 
    });
  }

  setPage(page: number): void {
    this.currentPage = page;
    const startIndex = (this.currentPage - 1) * 5;
    this.pagedTasks = this.tasks.slice(startIndex, startIndex + 5);
  }

  openDeleteDialog(taskId: number, taskName: string): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      data: { taskName }
    });

    dialogRef.componentInstance.confirm.subscribe(() => {
      this.deleteTask(taskId);
      dialogRef.close();
    });

    dialogRef.componentInstance.cancel.subscribe(() => {
      dialogRef.close();
    });
  }

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.getTasks(); // Refresh task list after delete
    });
  }

  onNewTask(): void {
    this.router.navigate(['/new']);
  }

  editTask(task: Task): void {
    this.router.navigate(['/edit', task.id]);
  }

  goToFirst(): void {
    this.setPage(1);
  }

  goToPrevious(): void {
    if (this.currentPage > 1) {
      this.setPage(this.currentPage - 1);
    }
  }

  goToNext(): void {
    if (this.currentPage < this.totalPages) {
      this.setPage(this.currentPage + 1);
    }
  }

  goToLast(): void {
    this.setPage(this.totalPages);
  }


}
