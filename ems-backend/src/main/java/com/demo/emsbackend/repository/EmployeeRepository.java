package com.demo.emsbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.demo.emsbackend.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long>{

    
} 
