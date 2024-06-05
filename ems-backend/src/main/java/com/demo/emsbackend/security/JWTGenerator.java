package com.demo.emsbackend.security;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JWTGenerator {
 
    private static final SecretKey key = Keys.hmacShaKeyFor(hashSecretToBytes(SecurityConstants.JWT_SECRET));
    public String generateToken(Authentication authentication){
        String username = authentication.getName();
        Date currentDate = new Date();
        Date expireDate = new Date(currentDate.getTime() + SecurityConstants.JWT_EXPIRATION);

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
        var currentDate = new Date();
        return !expirationDate.before(currentDate);
    }

    public String getUsernameFromJwt(String token){
        Claims claims = getClaims(token);
        return claims.getSubject();
    }

    private Claims getClaims(String token) {
        return (Claims)Jwts.parser().verifyWith(key).build().parse(token).getPayload();
    }

    private static byte[] hashSecretToBytes(String secretKey) {
        try{
            final MessageDigest digest = MessageDigest.getInstance("SHA-256");
            
            final byte[] hashbytes = digest.digest(secretKey.getBytes());
            return hashbytes;
        } catch(NoSuchAlgorithmException ex){
            return null;
        }
    }
}
