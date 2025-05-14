package com.example.UserBridge.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.UserBridge.model.Task;

public interface TaskRepository extends JpaRepository<Task,Long> {

}
