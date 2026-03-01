package com.burgerking.kitchenportal.dto;

public class KitchenOrderItemResponse {

    private String dishName;
    private int quantity;

    public String getDishName() {
        return dishName;
    }

    public void setDishName(String dishName) {
        this.dishName = dishName;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    // getters & setters
}
