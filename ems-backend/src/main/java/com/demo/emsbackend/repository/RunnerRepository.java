package com.demo.emsbackend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.demo.emsbackend.entity.Runner;

public interface RunnerRepository extends JpaRepository<Runner, Long>{

    
    @Query("SELECT r.id FROM Runner r WHERE r.email = :email")
    Optional<Long> findIdByEmail(@Param("email") String email);
} 
