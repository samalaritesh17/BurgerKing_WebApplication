package com.burgerking.controller;

import com.burgerking.dto.OrderDetailsDTO;
import com.burgerking.dto.OrderSummaryDTO;
import com.burgerking.dto.RecentOrderDTO;
import com.burgerking.model.OrderStatus;
import com.burgerking.service.AdminOrderService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/orders")
public class AdminOrderController {

    private final AdminOrderService adminOrderService;

    public AdminOrderController(AdminOrderService adminOrderService) {
        this.adminOrderService = adminOrderService;
    }

    @GetMapping("/summary")
    public OrderSummaryDTO getOrderSummary() {
        return adminOrderService.getOrderSummary();
    }

    @GetMapping("/recent")
    public Page<RecentOrderDTO> getRecentOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return adminOrderService.getRecentOrders(page, size);
    }

    @GetMapping("/{orderId}/status")
    public OrderStatus getOrderStatus(@PathVariable Integer orderId) {
        return adminOrderService.getCurrentOrderStatus(orderId);
    }

    @GetMapping("/{orderId}/details")
    public OrderDetailsDTO getOrderDetails(@PathVariable Integer orderId)   {
        return adminOrderService.getOrderDetails(orderId);
    }

    @GetMapping
    public Page<RecentOrderDTO> getOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return adminOrderService.getRecentOrders(page, size);
    }
}
