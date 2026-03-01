package com.burgerking.billingportal.service;

import com.burgerking.billingportal.dto.OrderRequest;
import com.burgerking.billingportal.dto.OrderItemRequest;
import com.burgerking.model.OrderEntity;
import com.burgerking.model.OrderItem;
import com.burgerking.model.OrderStatus;
import com.burgerking.model.OrderStatusHistory;
import com.burgerking.repository.OrderRepository;
import com.burgerking.repository.OrderItemRepository;
import com.burgerking.repository.OrderStatusHistoryRepository;
import com.burgerking.repository.UserRepository;
import com.burgerking.repository.DishRepository;
import com.burgerking.billingportal.util.OrderNumberGenerator;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final OrderStatusHistoryRepository orderStatusHistoryRepository;
    private final UserRepository userRepository;
    private final DishRepository dishRepository;

    public OrderService(OrderRepository orderRepository,
                        OrderItemRepository orderItemRepository,
                        OrderStatusHistoryRepository orderStatusHistoryRepository,
                        UserRepository userRepository,
                        DishRepository dishRepository) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.orderStatusHistoryRepository = orderStatusHistoryRepository;
        this.userRepository = userRepository;
        this.dishRepository = dishRepository;
    }

    @Transactional
    public String placeOrder(OrderRequest request, Integer userId) {

        // 🔹 Generate Order Number
        String orderNumber = OrderNumberGenerator.generateOrderNumber();

        // 🔹 Create OrderEntity
        OrderEntity order = new OrderEntity();
        order.setOrderNumber(orderNumber);
        order.setStatus(OrderStatus.PLACED);
        order.setTotalAmount(request.getTotalAmount());
        order.setCreatedBy(
                userRepository.findById(userId).orElse(null)
        );

        // Save order first
        order = orderRepository.save(order);

        // 🔹 Save Order Items
        for (OrderItemRequest item : request.getItems()) {

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);

            // Dish must exist at ordering time; order history is stored via snapshots.
            var dish = dishRepository.findById(item.getDishId())
                    .orElseThrow(() -> new RuntimeException("Dish not found: " + item.getDishId()));

            orderItem.setDish(dish);
            orderItem.setDishName(dish.getName());

            orderItem.setQuantity(item.getQuantity());
            orderItem.setPrice(item.getPrice());

            orderItemRepository.save(orderItem);
        }

        // 🔹 Save Order Status History
        OrderStatusHistory history = new OrderStatusHistory();
        history.setOrder(order);
        history.setStatus(OrderStatus.PLACED);

        orderStatusHistoryRepository.save(history);

        return orderNumber;
    }

    private String generateUniqueOrderNumber() {

        String orderNumber;
        do {
            orderNumber = OrderNumberGenerator.generateOrderNumber();
        } while (orderRepository.existsByOrderNumber(orderNumber));

        return orderNumber;
    }

}
