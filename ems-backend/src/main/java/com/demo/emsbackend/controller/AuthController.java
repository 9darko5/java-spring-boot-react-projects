package com.demo.emsbackend.controller;

import com.demo.emsbackend.service.TokenBlacklistService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.websocket.server.PathParam;

import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import com.demo.emsbackend.dto.AuthResponseDto;
import com.demo.emsbackend.dto.LoginDto;
import com.demo.emsbackend.dto.RegisterDto;
import com.demo.emsbackend.entity.Role;
import com.demo.emsbackend.entity.UserEntity;
import com.demo.emsbackend.repository.RoleRepository;
import com.demo.emsbackend.repository.UserRepository;
import com.demo.emsbackend.security.JWTGenerator;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;




@CrossOrigin("*")
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private AuthenticationManager authenticationManager;
    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;
    private JWTGenerator jwtGenerator;

    private TokenBlacklistService tokenBlacklistService;

    public AuthController(AuthenticationManager authenticationManager,
    UserRepository userRepository,
    RoleRepository roleRepository,
    PasswordEncoder passwordEncoder,
    JWTGenerator jwtGenerator,
    TokenBlacklistService tokenBlacklistService){
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtGenerator = jwtGenerator;
        this.tokenBlacklistService = tokenBlacklistService;
    }

    @PostMapping("login")
    public ResponseEntity<AuthResponseDto> login(@RequestBody LoginDto loginDto) {
        
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDto.getUsername(), 
        loginDto.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtGenerator.generateToken(authentication);
        return new ResponseEntity<>(new AuthResponseDto(token), HttpStatus.OK);
    }

    @PostMapping("logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        String token = getJWTFromRequest(request);
        if (StringUtils.hasText(token)) {
            tokenBlacklistService.blacklistToken(token);
            SecurityContextHolder.clearContext();
        }
        return ResponseEntity.ok("Logout successful");
    }

    @PostMapping("register")
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto) {
        if(userRepository.existsByUsername(registerDto.getUsername())){
            return new ResponseEntity<>("Username is taken!", HttpStatus.BAD_REQUEST);
        }

        UserEntity user = new UserEntity();

        user.setUsername(registerDto.getUsername());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));

        Role roles = roleRepository.findByName("USER").get();
        user.setRoles(Collections.singletonList(roles));

        userRepository.save(user);

        return new ResponseEntity<>("User registered successfully!", HttpStatus.OK);
    }

    @GetMapping("getUserRoles")
    public ResponseEntity<List<Role>> getUserRoles(@PathParam("username") String username) {
        List<Role> roles = userRepository.findRolesByUsername(username);
        return ResponseEntity.ok(roles); // );
    }
    
    @GetMapping("IsAlive")
    public String getMethodName() {
        return new String("OK");
    }

    private String getJWTFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
