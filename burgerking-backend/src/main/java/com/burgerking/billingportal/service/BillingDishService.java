package com.burgerking.billingportal.service;

import com.burgerking.billingportal.dto.BillingDishResponse;
import com.burgerking.billingportal.repository.BillingDishRepository;
import com.burgerking.model.Dish;
import com.burgerking.model.DishImage;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BillingDishService {

    private final BillingDishRepository dishRepository;

    public BillingDishService(BillingDishRepository dishRepository) {
        this.dishRepository = dishRepository;
    }

    public List<BillingDishResponse> getAllAvailableDishes() {

        List<Dish> dishes = dishRepository.findByAvailableTrue();

        return dishes.stream().map(dish -> {
            BillingDishResponse dto = new BillingDishResponse();

            dto.setId(dish.getId());
            dto.setName(dish.getName());
            dto.setPrice(dish.getPrice());
            dto.setDiscount(dish.getDiscount());

            if (dish.getDishImage() != null) {
                dto.setImage(
                        dish.getDishImage().getImageUrl()
                );
            } else {
                dto.setImage(null);
            }


            return dto;
        }).collect(Collectors.toList());
    }

}
