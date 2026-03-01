package com.burgerking.service;

import com.burgerking.dto.LoginRequest;
import com.burgerking.dto.LoginResponse;
import com.burgerking.dto.RegisterRequest;
import com.burgerking.model.User;
import com.burgerking.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /* =========================
       AUTH / LOGIN / REGISTER
       ========================= */

    public String registerUser(RegisterRequest request) {

        if (userRepository.existsByUsername(request.getUsername())) {
            return "USERNAME_ALREADY_EXISTS";
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRoleId(mapRoleToId(request.getRole()));
        user.setActive(true);
        user.setCreatedAt(LocalDateTime.now());

        userRepository.save(user);

        return "REGISTERED_AS_" + request.getRole();
    }

    private Integer mapRoleToId(String role) {
        return switch (role.toUpperCase()) {
            case "ADMIN" -> 1;
            case "USER" -> 2;
            case "KITCHEN" -> 3;
            default -> 2;
        };
    }

    public LoginResponse loginUser(LoginRequest request) {

        User user = userRepository.findByUsername(request.getUsername())
                .orElse(null);

        if (user == null) {
            return new LoginResponse("User not found", null, false);
        }

        if (!passwordMatchesAndMaybeUpgrade(user, request.getPassword())) {
            return new LoginResponse("Invalid password", null, false);
        }

        if (Boolean.FALSE.equals(user.getActive())) {
            return new LoginResponse("User is inactive", null, false);
        }

        if (user.getRoleId() == 1) {
            return new LoginResponse("Admin login successful", "ADMIN", true);
        } else {
            return new LoginResponse("Login successful", "USER", true);
        }
    }

    /* =========================
       MANAGE STAFF BACKEND
       ========================= */

    // 1️⃣ Get all users (staff)
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // 2️⃣ Add staff / admin / kitchen (from admin panel)
    public User addUser(User user) {

        if (userRepository.existsByUsername(user.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        user.setActive(true);
        user.setCreatedAt(LocalDateTime.now());

        if (user.getPassword() != null && !user.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }

        return userRepository.save(user);
    }

    // 3️⃣ Update user (edit staff)
    public User updateUser(Integer id, User updatedUser) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setUsername(updatedUser.getUsername());
        user.setRoleId(updatedUser.getRoleId());

        return userRepository.save(user);
    }

    // 4️⃣ Delete user
    public void deleteUser(Integer id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found");
        }
        userRepository.deleteById(id);
    }

    // 5️⃣ Toggle active / inactive
    public User toggleUserStatus(Integer id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setActive(!user.getActive());
        return userRepository.save(user);
    }

    private boolean passwordMatchesAndMaybeUpgrade(User user, String rawPassword) {
        String stored = user.getPassword();

        if (stored == null) {
            return false;
        }

        // Backward-compatible: accept legacy plaintext and upgrade to bcrypt on successful login.
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
