package com.demo.emsbackend.service;

import java.util.List;

import com.demo.emsbackend.dto.RunnerDto;

public interface RunnerService {
    RunnerDto createRunnerDto(RunnerDto runnerDto);
    RunnerDto getRunnerById(Long runnerId);
    List<RunnerDto> getAllRunners();
    RunnerDto updateRunner(Long runnerId, RunnerDto runnerDto);
    void deleteRunner(Long runnerId);
}
