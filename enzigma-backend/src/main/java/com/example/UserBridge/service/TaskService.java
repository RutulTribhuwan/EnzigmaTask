package com.example.UserBridge.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.UserBridge.model.Task;
import com.example.UserBridge.repository.TaskRepository;

@Service
public class TaskService {

	
	private final TaskRepository repo;

    public TaskService(TaskRepository repo) {
        this.repo = repo;
    }

    public List<Task> getAllTasks() {
        return repo.findAll();
    }

    public Task createTask(Task task) {
        return repo.save(task);
    }
    
    public Task getTaskById(Long id) {
        return repo.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));
    }


    public Task updateTask(Long id, Task task) {
        Task existing = repo.findById(id).orElseThrow();
        existing.setAssignedTo(task.getAssignedTo());
        existing.setStatus(task.getStatus());
        existing.setDueDate(task.getDueDate());
        existing.setPriority(task.getPriority());
        existing.setDescription(task.getDescription());
        return repo.save(existing);
    }

    public void deleteTask(Long id) {
        repo.deleteById(id);
    }
	
	
}
