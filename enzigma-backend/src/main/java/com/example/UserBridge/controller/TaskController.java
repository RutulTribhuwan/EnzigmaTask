package com.example.UserBridge.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.UserBridge.model.Task;
import com.example.UserBridge.service.TaskService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class TaskController {

	
	
	 private final TaskService service;

	    public TaskController(TaskService service) {
	        this.service = service;
	    }

	    @GetMapping("/tasks")
	    public List<Task> getTasks() {
	        return service.getAllTasks();
	    }

	    // 🔹 Get task by ID (for Edit)
	    @GetMapping("/task/{id}")
	    public Task getTaskById(@PathVariable Long id) {
	        return service.getTaskById(id);
	    }

	    // 🔹 Add new task
	    @PostMapping("/task")
	    public Task addTask(@RequestBody Task task) {
	        return service.createTask(task);
	    }

	    // 🔹 Update task by ID
	    @PutMapping("/task/{id}")
	    public Task updateTask(@PathVariable Long id, @RequestBody Task task) {
	        return service.updateTask(id, task);
	    }

	    // 🔹 Delete task by ID
	    @DeleteMapping("/task/{id}")
	    public void deleteTask(@PathVariable Long id) {
	        service.deleteTask(id);
	    }

	
	
	
	
}
