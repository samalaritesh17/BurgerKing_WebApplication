package com.burgerking.dto;

import java.math.BigDecimal;

public class OrderSummaryDTO {

    private long totalOrdersToday;
    private BigDecimal totalRevenueToday;
    private long placedOrders;
    private long preparingOrders;
    private long readyOrders;

    public OrderSummaryDTO(long totalOrdersToday,
                           BigDecimal totalRevenueToday,
                           long placedOrders,
                           long preparingOrders,
                           long readyOrders) {
        this.totalOrdersToday = totalOrdersToday;
        this.totalRevenueToday = totalRevenueToday;
        this.placedOrders = placedOrders;
        this.preparingOrders = preparingOrders;
        this.readyOrders = readyOrders;
    }

    public long getTotalOrdersToday() {
        return totalOrdersToday;
    }

    public BigDecimal getTotalRevenueToday() {
        return totalRevenueToday;
    }

    public long getPlacedOrders() {
        return placedOrders;
    }

    public long getPreparingOrders() {
        return preparingOrders;
    }

    public long getReadyOrders() {
        return readyOrders;
    }
}
