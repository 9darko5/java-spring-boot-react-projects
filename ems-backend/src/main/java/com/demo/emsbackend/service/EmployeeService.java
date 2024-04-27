package com.demo.emsbackend.service;

import java.util.List;

import com.demo.emsbackend.dto.EmployeeDto;

public interface EmployeeService {
    EmployeeDto createEmployeeDto(EmployeeDto employeeDto);
    EmployeeDto getEmployeeById(Long employeeId);
    List<EmployeeDto> getAllEmployees();
    EmployeeDto updaEmployee(Long employeeId, EmployeeDto employeeDto);
    void deleteEmployee(Long employeeId);
}
