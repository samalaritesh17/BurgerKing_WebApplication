package com.burgerking.billingportal.dto;

import java.math.BigDecimal;
import java.util.List;

public class OrderRequest {

    private List<OrderItemRequest> items;
    private BigDecimal totalAmount;

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public List<OrderItemRequest> getItems() {
        return items;
    }

    public void setItems(List<OrderItemRequest> items) {
        this.items = items;
    }
// getters & setters
}
