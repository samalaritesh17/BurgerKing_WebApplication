package com.burgerking.controller;

import com.burgerking.dto.LoginRequest;
import com.burgerking.dto.LoginResponse;
import com.burgerking.dto.RegisterRequest;
import com.burgerking.repository.UserRepository;
import com.burgerking.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    private final UserService userService;
    private final UserRepository userRepository;

    public AuthController(UserService userService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        String result = userService.registerUser(request);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @RequestBody LoginRequest request) {

        LoginResponse response = userService.loginUser(request);

        if (response.isSuccess()) {
            var user = userRepository.findByUsername(request.getUsername()).orElse(null);
            if (user != null) {
                // Token generation is intentionally disabled.
                response.setUserId(user.getId());
                response.setUsername(user.getUsername());
            }
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(401).body(response);
        }
    }

}
