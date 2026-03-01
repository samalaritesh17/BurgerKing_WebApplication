package com.burgerking.model;

import jakarta.persistence.*;

@Entity
@Table(name = "dish_images")
public class DishImage {

    @Id
    private Integer dishId;

    @OneToOne(optional = false)
    @MapsId
    @JoinColumn(name = "dish_id")
    private Dish dish;

    @Column(name = "image_url")
    private String imageUrl;

    // getters & setters

    public Integer getDishId() {
        return dishId;
    }

    public void setDishId(Integer dishId) {
        this.dishId = dishId;
    }

    public Dish getDish() {
        return dish;
    }

    public void setDish(Dish dish) {
        this.dish = dish;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
