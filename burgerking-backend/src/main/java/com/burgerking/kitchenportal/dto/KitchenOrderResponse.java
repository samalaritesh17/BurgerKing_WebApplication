package com.burgerking.kitchenportal.dto;

import java.time.LocalDateTime;
import java.util.List;

public class KitchenOrderResponse {

    private Integer id;
    private String orderNumber;
    private String status;
    private LocalDateTime createdAt;
    private List<KitchenOrderItemResponse> items;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(String orderNumber) {
        this.orderNumber = orderNumber;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public List<KitchenOrderItemResponse> getItems() {
        return items;
    }

    public void setItems(List<KitchenOrderItemResponse> items) {
        this.items = items;
    }

    // getters & setters
}
