package com.burgerking.kitchenportal.service;

import com.burgerking.kitchenportal.dto.KitchenOrderItemResponse;
import com.burgerking.kitchenportal.dto.KitchenOrderResponse;
import com.burgerking.kitchenportal.repository.KitchenOrderRepository;
import com.burgerking.model.OrderEntity;
import com.burgerking.model.OrderStatus;
import com.burgerking.model.OrderStatusHistory;
import com.burgerking.repository.OrderStatusHistoryRepository;  // ✅ USE EXISTING
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KitchenService {

    private final KitchenOrderRepository orderRepository;
    private final OrderStatusHistoryRepository historyRepository;

    public KitchenService(KitchenOrderRepository orderRepository,
                          OrderStatusHistoryRepository historyRepository) {
        this.orderRepository = orderRepository;
        this.historyRepository = historyRepository;
    }

    public List<KitchenOrderResponse> getActiveOrders() {

        List<OrderEntity> orders =
                orderRepository.findByStatusInOrderByCreatedAtAsc(
                        List.of(OrderStatus.PLACED, OrderStatus.PREPARING)
                );

        return orders.stream().map(order -> {

            KitchenOrderResponse response = new KitchenOrderResponse();
            response.setId(order.getId());
            response.setOrderNumber(order.getOrderNumber());
            response.setStatus(order.getStatus().name());
            response.setCreatedAt(order.getCreatedAt());

            // ADD LOGIC HERE
            if (order.getStatus() == OrderStatus.PREPARING) {

                List<KitchenOrderItemResponse> items =
                        order.getItems().stream()
                                     .map(item -> {
                                     KitchenOrderItemResponse itemResponse =
                                             new KitchenOrderItemResponse();
                                    itemResponse.setDishName(item.getDishName());
                                    itemResponse.setQuantity(item.getQuantity());
                                    return itemResponse;
                                 }).toList();

                response.setItems(items);

            } else {
                response.setItems(List.of()); // Empty for PLACED
            }

            return response;

        }).toList();
    }


    // 🔹 Accept Order → PREPARING
    public OrderEntity acceptOrder(Integer orderId) {

        OrderEntity order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (order.getStatus() != OrderStatus.PLACED) {
            throw new RuntimeException("Only PLACED orders can be accepted");
        }

        order.setStatus(OrderStatus.PREPARING);
        orderRepository.save(order);

        // Save history
        historyRepository.save(new OrderStatusHistory(order, OrderStatus.PREPARING));

        return order;
    }

    // 🔹 Mark Ready → READY
    public OrderEntity markReady(Integer orderId) {

        OrderEntity order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (order.getStatus() != OrderStatus.PREPARING) {
            throw new RuntimeException("Only PREPARING orders can be marked READY");
        }

        order.setStatus(OrderStatus.READY);
        orderRepository.save(order);

        // Save history
        historyRepository.save(new OrderStatusHistory(order, OrderStatus.READY));

        return order;
    }
}
