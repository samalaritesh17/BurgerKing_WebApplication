package com.burgerking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.burgerking.model.Dish;

public interface DishRepository extends JpaRepository<Dish, Integer> {

    @Query("SELECT COUNT(d) FROM Dish d")
    long countTotalDishes();

    @Query("SELECT COUNT(d) FROM Dish d WHERE d.available = true")
    long countAvailableDishes();

    @Query("SELECT COUNT(d) FROM Dish d WHERE d.available = false")
    long countOutOfStockDishes();
}
