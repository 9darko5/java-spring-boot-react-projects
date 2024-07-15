package com.demo.emsbackend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.demo.emsbackend.entity.Role;
import com.demo.emsbackend.entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByEmail(String email);
    Boolean existsByEmail(String email);

    @Query("SELECT u.roles FROM UserEntity u WHERE u.email = :email")
    List<Role> findRolesByEmail(@Param("email") String email);
}
