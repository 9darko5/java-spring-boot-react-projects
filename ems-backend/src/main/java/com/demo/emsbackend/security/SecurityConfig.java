package com.demo.emsbackend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(authorize -> authorize
                .requestMatchers(HttpMethod.GET).hasAnyRole("ADMIN")
                .anyRequest().authenticated()
            )
            .formLogin(withDefaults());

        return http.build();
    }

    @Bean
    public UserDetailsService users(){
        UserDetails admin = User.builder()
                .username("admin")
                .password("$2a$12$FtToK1ixuWhTNyfqffUckeCBpelxN0Uv5/lC88dmpWR.91x.eVT3S") //"password" encoded by BCryptPasswordEncoder 
                .roles("ADMIN")
                .build();

        
        UserDetails user = User.builder()
                .username("user")
                .password("$2a$12$FtToK1ixuWhTNyfqffUckeCBpelxN0Uv5/lC88dmpWR.91x.eVT3S") //"password" encoded by BCryptPasswordEncoder 
                .roles("USER")
                .build();

        return new InMemoryUserDetailsManager(admin, user);
    }

    @Bean
    public PasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }

}
