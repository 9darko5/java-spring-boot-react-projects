package com.demo.emsbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.demo.emsbackend.entity.Runner;

public interface RunnerRepository extends JpaRepository<Runner, Long>{

    
} 
