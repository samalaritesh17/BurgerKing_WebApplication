package com.burgerking.repository;

import com.burgerking.model.DishImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DishImageRepository extends JpaRepository<DishImage, Integer> {
}
