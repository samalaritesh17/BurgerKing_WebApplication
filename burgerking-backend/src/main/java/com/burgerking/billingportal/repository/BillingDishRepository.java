package com.burgerking.billingportal.repository;

import com.burgerking.model.Dish;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BillingDishRepository extends JpaRepository<Dish, Integer> {

    List<Dish> findByAvailableTrue();

    // Ensures dish images are loaded reliably (avoids LAZY-loading issues in some configs).
    @Query("""
            SELECT d
            FROM Dish d
            LEFT JOIN FETCH d.dishImage
            WHERE d.available = true
            """)
    List<Dish> findAvailableWithImages();
}
