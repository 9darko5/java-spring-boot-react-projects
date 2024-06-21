package com.demo.emsbackend.service;

import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

public interface TokenBlacklistService {

    public void blacklistToken(String token);

    public boolean isTokenBlacklisted(String token);
}

