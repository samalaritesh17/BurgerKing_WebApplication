package com.burgerking.controller;

import com.burgerking.dto.AddDishRequest;
import com.burgerking.dto.DishResponse;
import com.burgerking.dto.ToggleDiscountRequest;
import com.burgerking.dto.UpdateDishPricingRequest;
import com.burgerking.model.Dish;
import com.burgerking.service.AdminDishService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/admin/dishes")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminDishController {

    private final AdminDishService adminDishService;

    public AdminDishController(AdminDishService adminDishService) {
        this.adminDishService = adminDishService;
    }

    @GetMapping
    public List<DishResponse> getAllDishes() {
        return adminDishService.getAllDishes();
    }

    @PatchMapping("/{id}/availability")
    public void toggleAvailability(@PathVariable Integer id) {
        adminDishService.toggleAvailability(id);
    }

    @PatchMapping("/{id}/pricing")
    public void updatePricing(
            @PathVariable Integer id,
            @RequestBody UpdateDishPricingRequest request
    ) {
        adminDishService.updatePricing(id, request.getPrice(), request.getDiscount());
    }

    @PatchMapping("/{id}/discount-toggle")
    public void toggleDiscount(
            @PathVariable Integer id,
            @RequestBody(required = false) ToggleDiscountRequest request
    ) {
        adminDishService.toggleDiscount(
                id,
                request != null ? request.getDiscount() : null
        );
    }

    @PostMapping(consumes = "multipart/form-data")
    public void addDish(
            @RequestParam String name,
            @RequestParam(required = false) String category,
            @RequestParam BigDecimal price,
            @RequestParam(required = false) BigDecimal discount,
            @RequestParam(required = false) Boolean available,
            @RequestPart(value = "image", required = false) MultipartFile image
    ) {
        AddDishRequest request = new AddDishRequest();
        request.setName(name);
        request.setCategory(category);
        request.setPrice(price);
        request.setDiscount(discount);
        request.setAvailable(available);
        System.out.println("add Dish Controller");
        adminDishService.addDish(request, image);
        System.out.println("called service add Dish Controller");
    }

    @DeleteMapping("/{id}")
    public void deleteDish(@PathVariable Integer id) {
        adminDishService.deleteDish(id);
    }

    @GetMapping("/{id}")
    public Dish getDishById(@PathVariable Integer id) {
        return adminDishService.getDishById(id);
    }
}
