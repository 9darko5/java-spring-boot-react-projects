package com.demo.emsbackend.mapper;

import com.demo.emsbackend.dto.RunnerDto;
import com.demo.emsbackend.entity.Runner;

public class RunnerMapper {
    public static RunnerDto mapToRunnerDto(Runner runner){
        return new RunnerDto(
            runner.getId(),
            runner.getFirstName(),
            runner.getLastName(),
            runner.getEmail()
        );
    }

    public static Runner mapToRunner(RunnerDto runnerDto){
        return new Runner(
            runnerDto.getId(),
            runnerDto.getFirstName(),
            runnerDto.getLastName(),
            runnerDto.getEmail()
        );
    }
}
