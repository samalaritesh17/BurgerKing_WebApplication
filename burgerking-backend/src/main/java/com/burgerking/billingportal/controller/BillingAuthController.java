package com.burgerking.billingportal.controller;

import com.burgerking.billingportal.dto.BillingLoginRequest;
import com.burgerking.billingportal.dto.BillingLoginResponse;
import com.burgerking.billingportal.service.BillingAuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/billing/auth")
public class BillingAuthController {

    private final BillingAuthService authService;

    public BillingAuthController(BillingAuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<BillingLoginResponse> login(
            @RequestBody BillingLoginRequest request
    ) {
        return ResponseEntity.ok(authService.login(request));
    }
}
