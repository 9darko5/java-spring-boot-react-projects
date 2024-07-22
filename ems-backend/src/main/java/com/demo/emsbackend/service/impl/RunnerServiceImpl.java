package com.demo.emsbackend.service.impl;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import com.demo.emsbackend.entity.Role;
import com.demo.emsbackend.entity.UserEntity;
import com.demo.emsbackend.repository.RoleRepository;
import com.demo.emsbackend.repository.UserRepository;
import org.springframework.stereotype.Service;

import com.demo.emsbackend.dto.RunnerDto;
import com.demo.emsbackend.entity.Runner;
import com.demo.emsbackend.exceptions.ResourceNotFoundException;
import com.demo.emsbackend.mapper.RunnerMapper;
import com.demo.emsbackend.repository.RunnerRepository;
import com.demo.emsbackend.service.RunnerService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class RunnerServiceImpl implements RunnerService {
    private RunnerRepository runnerRepository;
    private RoleRepository roleRepository;
    private UserRepository userRepository;

    @Override
    public RunnerDto createRunnerDto(RunnerDto runnerDto) throws Exception {
        Runner runner = RunnerMapper.mapToRunner(runnerDto);

        Runner savedRunner = runnerRepository.save(runner);
        if(runnerDto.getFirstName().contains("Stanko"))
            throw new Exception("Test exception");

        if(userRepository.existsByEmail(runnerDto.getEmail())){
            throw new Exception("Email is taken!");
        }

        UserEntity user = new UserEntity();

        user.setEmail(runnerDto.getEmail());
        user.setPassword("$2a$10$JIUdLgjxd76t43Q86Xg3w.duLDC/ovyMzdzl/7vlh/sjCi2nFQK4O"); //Test123.

        Role roles = roleRepository.findByName("ROLE_USER").get();
        user.setRoles(Collections.singletonList(roles));

        userRepository.save(user);


        return RunnerMapper.mapToRunnerDto(savedRunner);
    }

    @Override
    public RunnerDto getRunnerById(Long runnerId) {
        Runner runner = runnerRepository.findById(runnerId)
            .orElseThrow(
                ()->new ResourceNotFoundException("Runner is not exist with given id : " + runnerId));
                
        return RunnerMapper.mapToRunnerDto(runner);
    }

    @Override
    public List<RunnerDto> getAllRunners() {
        List<Runner> runners = runnerRepository.findAll();

        return runners.stream().map((runner) -> RunnerMapper.mapToRunnerDto(runner)).collect(Collectors.toList());
    }

    @Override
    public RunnerDto updateRunner(Long runnerId, RunnerDto updatedRunner) {
        Runner runner = runnerRepository.findById(runnerId)
            .orElseThrow(() -> new ResourceNotFoundException("Runner is not exists with given id: " + runnerId));

        runner.setFirstName(updatedRunner.getFirstName());
        runner.setLastName(updatedRunner.getLastName());
        runner.setEmail(updatedRunner.getEmail());

        Runner updatedRunnerObj = runnerRepository.save(runner);

        return RunnerMapper.mapToRunnerDto(updatedRunnerObj);
    }

    @Override
    public void deleteRunner(Long runnerId) {
        runnerRepository.findById(runnerId)
            .orElseThrow(() -> new ResourceNotFoundException("Runner is not exists with given id: " + runnerId));

        runnerRepository.deleteById(runnerId);
    }

}
