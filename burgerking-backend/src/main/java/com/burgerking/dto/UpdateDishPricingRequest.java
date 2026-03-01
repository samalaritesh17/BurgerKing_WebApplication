package com.burgerking.dto;

import java.math.BigDecimal;

public class UpdateDishPricingRequest {

    private BigDecimal price;
    private BigDecimal discount;

    public UpdateDishPricingRequest() {}

    public BigDecimal getPrice() {
        return price;
    }

    public BigDecimal getDiscount() {
        return discount;
    }
}
