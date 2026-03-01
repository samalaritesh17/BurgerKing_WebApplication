package com.burgerking.billingportal.service;

import com.burgerking.billingportal.dto.BillingLoginRequest;
import com.burgerking.billingportal.dto.BillingLoginResponse;
import com.burgerking.billingportal.exception.UnauthorizedException;
import com.burgerking.billingportal.repository.BillingUserRepository;
import com.burgerking.model.User;
import com.burgerking.security.JwtService;
import com.burgerking.security.Roles;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class BillingAuthService {

    private final BillingUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public BillingAuthService(BillingUserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public BillingLoginResponse login(BillingLoginRequest request) {

        User user = userRepository
                .findByUsernameAndActiveTrue(request.getUsername())
                .orElseThrow(() ->
                        new UnauthorizedException("Invalid username or password")
                );

        if (!passwordMatchesAndMaybeUpgrade(user, request.getPassword())) {
            throw new UnauthorizedException("Invalid username or password");
        }

        // ❌ Block kitchen users
        if (user.getRoleId() == 3) {
            throw new UnauthorizedException("Kitchen users are not allowed to login");
        }

        // ❌ Block unknown roles
        if (user.getRoleId() != 1 && user.getRoleId() != 2) {
            throw new UnauthorizedException("Unauthorized role");
        }

        BillingLoginResponse response = new BillingLoginResponse();
        response.setMessage("Welcome to BurgerKing Billing Portal");
        response.setRoleId(user.getRoleId());
        response.setRoleName(Roles.roleNameFromRoleId(user.getRoleId()));
        response.setId(user.getId());
        response.setUsername(user.getUsername());
        response.setToken(jwtService.generateToken(user));

        return response;
    }

    private boolean passwordMatchesAndMaybeUpgrade(User user, String rawPassword) {
        String stored = user.getPassword();

        if (stored == null) {
            return false;
        }

        boolean looksLikeBcrypt = stored.startsWith("$2a$")
                || stored.startsWith("$2b$")
                || stored.startsWith("$2y$");

        if (looksLikeBcrypt) {
            return passwordEncoder.matches(rawPassword, stored);
        }

        boolean matchesLegacyPlaintext = stored.equals(rawPassword);
        if (matchesLegacyPlaintext) {
            user.setPassword(passwordEncoder.encode(rawPassword));
            userRepository.save(user);
        }
        return matchesLegacyPlaintext;
    }

}
