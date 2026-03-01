package com.burgerking.billingportal.controller;

import com.burgerking.billingportal.dto.OrderRequest;
import com.burgerking.billingportal.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/place")
    public ResponseEntity<?> placeOrder(
            @RequestBody OrderRequest request,
            @RequestParam Integer userId) {

        if (request.getItems() == null || request.getItems().isEmpty()) {
            return ResponseEntity.badRequest()
                    .body("Cart cannot be empty");
        }

        String orderNumber = orderService.placeOrder(request, userId);

        return ResponseEntity.ok(
                Map.of(
                        "orderNumber", orderNumber,
                        "message", "Order placed successfully"
                )
        );
    }
}
