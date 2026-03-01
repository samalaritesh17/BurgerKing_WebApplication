package com.burgerking.dto;

import java.math.BigDecimal;

public class ToggleDiscountRequest {

    private BigDecimal discount;

    public ToggleDiscountRequest() {}

    public BigDecimal getDiscount() {
        return discount;
    }
}
