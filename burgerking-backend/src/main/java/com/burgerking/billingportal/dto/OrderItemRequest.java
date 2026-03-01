package com.burgerking.billingportal.dto;

import java.math.BigDecimal;

public class OrderItemRequest {

    private Integer dishId;
    private Integer quantity;
    private BigDecimal price;

    // getters & setters

    public Integer getDishId() {
        return dishId;
    }

    public void setDishId(Integer dishId) {
        this.dishId = dishId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }
}
