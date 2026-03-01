package com.burgerking.dto;

import java.math.BigDecimal;

public class DishResponse {

    private Integer id;
    private String name;
    private String category;
    private BigDecimal price;
    private BigDecimal discount;
    private boolean available;
    private String imageUrl;

    public Integer getId() {
        return id;
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

    public boolean isAvailable() {
        return available;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public DishResponse(
            Integer id,
            String name,
            String category,
            BigDecimal price,
            BigDecimal discount,
            boolean available,
            String imageUrl
    ) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.discount = discount;
        this.available = available;
        this.imageUrl = imageUrl;
    }

    // getters only
}
