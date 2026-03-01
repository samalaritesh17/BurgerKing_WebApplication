package com.burgerking.billingportal.controller;

import com.burgerking.billingportal.dto.BillingDishResponse;
import com.burgerking.billingportal.service.BillingDishService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/billing/dishes")
public class BillingDishController {

    private final BillingDishService dishService;

    public BillingDishController(BillingDishService dishService) {
        this.dishService = dishService;
    }

    @GetMapping
    public List<BillingDishResponse> getAllDishes() {
        return dishService.getAllAvailableDishes();
    }
}
