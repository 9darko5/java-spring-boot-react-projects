package com.demo.emsbackend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.demo.emsbackend.entity.Role;
import com.demo.emsbackend.entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByUsername(String username);
    Boolean existsByUsername(String username);

    @Query("SELECT u.roles FROM UserEntity u WHERE u.username = :username")
    List<Role> findRolesByUsername(@Param("username") String username);
}
