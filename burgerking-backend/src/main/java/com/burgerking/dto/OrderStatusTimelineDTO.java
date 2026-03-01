package com.burgerking.dto;

import com.burgerking.model.OrderStatus;
import java.time.LocalDateTime;

public class OrderStatusTimelineDTO {

    private OrderStatus status;
    private LocalDateTime changedAt;

    public OrderStatusTimelineDTO(OrderStatus status, LocalDateTime changedAt) {
        this.status = status;
        this.changedAt = changedAt;
    }

    public OrderStatus getStatus() { return status; }
    public LocalDateTime getChangedAt() { return changedAt; }
}
