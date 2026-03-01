package com.burgerking.kitchenportal.controller;

import com.burgerking.kitchenportal.dto.KitchenOrderResponse;
import com.burgerking.kitchenportal.service.KitchenService;
import com.burgerking.model.OrderEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/kitchen/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class KitchenController {

    private final KitchenService kitchenService;

    public KitchenController(KitchenService kitchenService) {
        this.kitchenService = kitchenService;
    }

    // 🔹 Get PLACED + PREPARING
    @GetMapping
    public ResponseEntity<List<KitchenOrderResponse>> getActiveOrders() {
        return ResponseEntity.ok(kitchenService.getActiveOrders());
    }

    // 🔹 Accept Order
    @PutMapping("/{orderId}/accept")
    public ResponseEntity<OrderEntity> acceptOrder(@PathVariable Integer orderId) {
        return ResponseEntity.ok(kitchenService.acceptOrder(orderId));
    }

    // 🔹 Mark Ready
    @PutMapping("/{orderId}/ready")
    public ResponseEntity<OrderEntity> markReady(@PathVariable Integer orderId) {
        return ResponseEntity.ok(kitchenService.markReady(orderId));
    }
}
