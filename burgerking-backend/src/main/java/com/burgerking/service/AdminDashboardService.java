package com.burgerking.service;

import com.burgerking.dto.AdminKpiResponse;
import com.burgerking.repository.DishRepository;
import com.burgerking.repository.OrderRepository;
import com.burgerking.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class AdminDashboardService {

    private final DishRepository dishRepository;
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;

    // Explicit constructor injection (BEST PRACTICE without Lombok)
    public AdminDashboardService(DishRepository dishRepository,
                                 OrderRepository orderRepository,
                                 UserRepository userRepository) {
        this.dishRepository = dishRepository;
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
    }

    public AdminKpiResponse getDashboardKpis() {


        Long admins = userRepository.countByRoleId(1);//ADMIN
        Long users = userRepository.countByRoleId(2);//USER
        Long kitchenStaff = userRepository.countByRoleId(3);//KITCHEN

        System.out.println("Admins  : "+admins);
        System.out.println("Users  : "+users);
        System.out.println("Kitchen Staff  : "+kitchenStaff);
        return new AdminKpiResponse(
                dishRepository.countTotalDishes(),
                dishRepository.countAvailableDishes(),
                dishRepository.countOutOfStockDishes(),
                orderRepository.countOrdersBetween(
                        java.time.LocalDate.now().atStartOfDay(),
                        java.time.LocalDate.now().plusDays(1).atStartOfDay()
                ),
                admins,
                users,
                kitchenStaff
        );
    }
}
