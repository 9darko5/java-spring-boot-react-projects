package com.demo.emsbackend.service.impl;

import java.util.List;
import java.util.stream.Collectors;

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

    @Override
    public RunnerDto createRunnerDto(RunnerDto runnerDto) {
        Runner runner = RunnerMapper.mapToRunner(runnerDto);

        Runner savedRunner = runnerRepository.save(runner);

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
