package com.demo.emsbackend.security;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Base64;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JWTGenerator {
 
    public String generateToken(Authentication authentication){
        String username = authentication.getName();
        Date currentDate = new Date();
        Date expireDate = new Date(currentDate.getTime() + SecurityConstants.JWT_EXPIRATION);
        SecretKey key = Keys.hmacShaKeyFor(Base64.getEncoder().encodeToString(SecurityConstants.JWT_SECRET.getBytes()).getBytes());

        String token = Jwts.builder()
            .subject(username)
            .issuedAt(new Date())
            .expiration(expireDate)
            .signWith(key)
            .compact();

            return token;
    } 

    public boolean validateToken(String token) {
        Date expirationDate = getClaims(token).getExpiration();
        return !expirationDate.before(new Date());
    }

    public String getUsernameFromJwt(String token){
        Claims claims = getClaims(token);
        return claims.getSubject();
    }

    private Claims getClaims(String token) {
        return Jwts.parser().
                verifyWith(Keys.hmacShaKeyFor(Base64.getEncoder().encodeToString(SecurityConstants.JWT_SECRET.getBytes()).getBytes()))
                .build().parseSignedClaims(token).getPayload();
    }
}
