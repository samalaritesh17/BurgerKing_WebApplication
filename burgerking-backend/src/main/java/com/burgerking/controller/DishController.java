package com.burgerking.controller;

import com.burgerking.model.Dish;
import com.burgerking.repository.DishRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dishes")
@CrossOrigin(origins = "http://localhost:5173")
public class DishController {

    private final DishRepository dishRepository;

    public DishController(DishRepository dishRepository) {
        this.dishRepository = dishRepository;
    }

    // GET all dishes
    @GetMapping
    public List<Dish> getAllDishes() {
        return dishRepository.findAll();
    }

    // POST create dish
    @PostMapping
    public Dish createDish(@RequestBody Dish dish) {
        return dishRepository.save(dish);
    }

    // DELETE dish by id
    @DeleteMapping("/{id}")
    public void deleteDish(@PathVariable Integer id) {
        dishRepository.deleteById(id);
    }
}
