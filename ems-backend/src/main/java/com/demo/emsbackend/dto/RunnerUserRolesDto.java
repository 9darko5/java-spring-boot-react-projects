package com.demo.emsbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RunnerUserRolesDto {
    private long runnerId;
    private String RolesCSV;
}
