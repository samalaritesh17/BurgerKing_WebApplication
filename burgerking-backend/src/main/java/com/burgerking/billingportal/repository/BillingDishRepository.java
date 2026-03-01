package com.burgerking.billingportal.repository;

import com.burgerking.model.Dish;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BillingDishRepository extends JpaRepository<Dish, Integer> {

    List<Dish> findByAvailableTrue();
}
