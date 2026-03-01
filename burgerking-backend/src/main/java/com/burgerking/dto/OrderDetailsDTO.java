package com.burgerking.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class OrderDetailsDTO {

    private Integer orderId;
    private String orderNumber;
    private BigDecimal totalAmount;
    private LocalDateTime createdAt;
    private String createdBy;

    private List<OrderItemDTO> items;
    private List<OrderStatusTimelineDTO> statusTimeline;

    public OrderDetailsDTO(
            Integer orderId,
            String orderNumber,
            BigDecimal totalAmount,
            LocalDateTime createdAt,
            String createdBy,
            List<OrderItemDTO> items,
            List<OrderStatusTimelineDTO> statusTimeline
    ) {
        this.orderId = orderId;
        this.orderNumber = orderNumber;
        this.totalAmount = totalAmount;
        this.createdAt = createdAt;
        this.createdBy = createdBy;
        this.items = items;
        this.statusTimeline = statusTimeline;
    }

    public Integer getOrderId() { return orderId; }
    public String getOrderNumber() { return orderNumber; }
    public BigDecimal getTotalAmount() { return totalAmount; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public String getCreatedBy() { return createdBy; }
    public List<OrderItemDTO> getItems() { return items; }
    public List<OrderStatusTimelineDTO> getStatusTimeline() { return statusTimeline; }
}
