package com.burgerking.dto;

import java.math.BigDecimal;

public class AddDishRequest {

    private String name;
    private String category;
    private BigDecimal price;
    private BigDecimal discount;
    private Boolean available;

    public AddDishRequest() {}

    public void setName(String name) {
        this.name = name;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public void setDiscount(BigDecimal discount) {
        this.discount = discount;
    }

    public void setAvailable(Boolean available) {
        this.available = available;
    }

    public String getName() {
        return name;
    }

    public String getCategory() {
        return category;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public BigDecimal getDiscount() {
        return discount;
    }

    public Boolean getAvailable() {
        return available;
    }
}
