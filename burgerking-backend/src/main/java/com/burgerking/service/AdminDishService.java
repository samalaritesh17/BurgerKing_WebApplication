package com.burgerking.service;

import com.burgerking.dto.AddDishRequest;
import com.burgerking.dto.DishResponse;
import com.burgerking.model.Dish;
import com.burgerking.model.DishImage;
import com.burgerking.repository.DishImageRepository;
import com.burgerking.repository.DishRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class AdminDishService {

    private final DishRepository dishRepository;
    private final DishImageRepository dishImageRepository;

    public AdminDishService(
            DishRepository dishRepository,
            DishImageRepository dishImageRepository
    ) {
        this.dishRepository = dishRepository;
        this.dishImageRepository = dishImageRepository;
    }

    public List<DishResponse> getAllDishes() {

        List<Dish> dishes = dishRepository.findAll();
        System.out.println("DISH COUNT FROM DB = " + dishes.size());

        Map<Integer, String> imageMap =
                dishImageRepository.findAll()
                        .stream()
                        .collect(Collectors.toMap(
                                DishImage::getDishId,
                                DishImage::getImageUrl
                        ));

        return dishes.stream()
                .map(d -> new DishResponse(
                        d.getId(),
                        d.getName(),
                        d.getCategory(),
                        d.getPrice(),
                        d.getDiscount(),
                        d.isAvailable(),
                        imageMap.get(d.getId())
                ))
                .toList();
    }

    public void toggleAvailability(Integer dishId) {

        Dish dish = dishRepository.findById(dishId)
                .orElseThrow(() -> new RuntimeException("Dish not found"));

        dish.setAvailable(!dish.isAvailable());
        dishRepository.save(dish);
    }

    public void updatePricing(Integer dishId, BigDecimal price, BigDecimal discount) {

        Dish dish = dishRepository.findById(dishId)
                .orElseThrow(() -> new RuntimeException("Dish not found"));

        if (price != null) {
            dish.setPrice(price);
        }

        if (discount != null) {
            dish.setDiscount(discount);
        }

        dishRepository.save(dish);
    }

    @Transactional
    public void toggleDiscount(Integer dishId, BigDecimal newDiscount) {

        Dish dish = dishRepository.findById(dishId)
                .orElseThrow(() -> new RuntimeException("Dish not found"));

        if (dish.getDiscount() != null
                && dish.getDiscount().compareTo(BigDecimal.ZERO) > 0) {

            // Turn OFF discount
            dish.setDiscount(BigDecimal.ZERO);

        } else {
            // Turn ON discount
            dish.setDiscount(
                    newDiscount != null ? newDiscount : new BigDecimal("10")
            );
        }
    }

    @Transactional
    public void addDish(AddDishRequest request, MultipartFile image) {

        Dish dish = new Dish();
        dish.setName(request.getName());
        dish.setCategory(request.getCategory());
        dish.setPrice(request.getPrice());
        dish.setDiscount(
                request.getDiscount() != null ? request.getDiscount() : BigDecimal.ZERO
        );
        dish.setAvailable(
                request.getAvailable() != null ? request.getAvailable() : true
        );

        dishRepository.save(dish);

        if (image != null && !image.isEmpty()) {
            String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();
            Path uploadPath = Paths.get("uploads", fileName);

            try {
                Files.createDirectories(uploadPath.getParent());
                Files.write(uploadPath, image.getBytes());
            } catch (IOException e) {
                throw new RuntimeException("Image upload failed");
            }

            DishImage dishImage = new DishImage();
            dishImage.setDish(dish);
            dishImage.setImageUrl("http://localhost:8080/uploads/" + fileName);

            dishImageRepository.save(dishImage);
        }
    }

    @Transactional
    public void deleteDish(Integer dishId) {

        // 1️⃣ Fetch image first (for file deletion)
        DishImage dishImage = dishImageRepository.findById(dishId).orElse(null);

        if (dishImage != null) {
            String imageUrl = dishImage.getImageUrl();

            // Extract filename from URL
            if (imageUrl != null && imageUrl.contains("/uploads/")) {
                String fileName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
                Path filePath = Paths.get("uploads", fileName);

                try {
                    Files.deleteIfExists(filePath);
                } catch (IOException e) {
                    // Log only — do NOT fail delete
                    System.err.println("Failed to delete image file: " + fileName);
                }
            }

            // Remove DB record for the image row as well (avoid FK issues).
            dishImageRepository.deleteById(dishId);
        }

        // 2️⃣ Delete dish (image row auto-deletes due to FK cascade)
        dishRepository.deleteById(dishId);
    }

    public Dish getDishById(int id) {
        return dishRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Dish not found"));
    }

}
