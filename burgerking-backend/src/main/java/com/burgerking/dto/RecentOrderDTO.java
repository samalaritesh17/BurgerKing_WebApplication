package com.burgerking.dto;

import com.burgerking.model.OrderStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class RecentOrderDTO {

    private Integer orderId;
    private String orderNumber;
    private BigDecimal totalAmount;
    private OrderStatus status;
    private LocalDateTime createdAt;

    public RecentOrderDTO(
            Integer orderId,
            String orderNumber,
            BigDecimal totalAmount,
            OrderStatus status,
            LocalDateTime createdAt
    ) {
        this.orderId = orderId;
        this.orderNumber = orderNumber;
        this.totalAmount = totalAmount;
        this.status = status;
        this.createdAt = createdAt;
    }

    // getters only (read-only DTO)
    public Integer getOrderId() {
        return orderId;
    }

    public String getOrderNumber() {
        return orderNumber;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
