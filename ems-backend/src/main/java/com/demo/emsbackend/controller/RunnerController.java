package com.demo.emsbackend.controller;

import com.demo.emsbackend.entity.Role;
import com.demo.emsbackend.entity.UserEntity;
import com.demo.emsbackend.repository.RoleRepository;
import com.demo.emsbackend.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import com.demo.emsbackend.dto.RunnerDto;
import com.demo.emsbackend.service.RunnerService;
import lombok.AllArgsConstructor;

import java.util.Collections;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/runners")
public class RunnerController {
    private RunnerService runnerService;
    private UserRepository userRepository;
    private RoleRepository roleRepository;

    // Build Add Runner REST API
    @PostMapping
    public ResponseEntity<RunnerDto> createRunner(@RequestBody RunnerDto runnerDto) throws Exception {
        RunnerDto savedRunner = runnerService.createRunnerDto(runnerDto);

        return new ResponseEntity<>(savedRunner, HttpStatus.CREATED);
    }

    // Build Get Runner REST API
    @GetMapping("{id}")
    public ResponseEntity<RunnerDto> getRunnerById(@PathVariable("id") Long runnerId){
        RunnerDto runnerDto = runnerService.getRunnerById(runnerId);
        return ResponseEntity.ok(runnerDto);
    }

    //Build Get All Runners REST API
    @GetMapping
    public ResponseEntity<List<RunnerDto>> getAllRunners(){
        List<RunnerDto> runners = runnerService.getAllRunners();

        return ResponseEntity.ok(runners);
    }

    // Build Update Runner REST API
    @PutMapping("{id}")
    public ResponseEntity<RunnerDto> updateRunner(@PathVariable("id") Long runnerId, @RequestBody RunnerDto updatedRunner){
        RunnerDto runnerDto = runnerService.updateRunner(runnerId, updatedRunner);

        return ResponseEntity.ok(runnerDto);
    }

    // Build Delete Runner REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteRunner(@PathVariable("id") Long runnerId){
        runnerService.deleteRunner(runnerId);

        return ResponseEntity.ok("Runner deleted successfully!");
    }
}
