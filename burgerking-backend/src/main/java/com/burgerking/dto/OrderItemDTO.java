package com.burgerking.dto;

import java.math.BigDecimal;

public class OrderItemDTO {

    private String dishName;
    private int quantity;
    private BigDecimal price;

    public OrderItemDTO(String dishName, int quantity, BigDecimal price) {
        this.dishName = dishName;
        this.quantity = quantity;
        this.price = price;
    }

    public String getDishName() { return dishName; }
    public int getQuantity() { return quantity; }
    public BigDecimal getPrice() { return price; }
}
