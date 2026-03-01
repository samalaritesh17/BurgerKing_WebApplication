package com.burgerking.service;

import com.burgerking.dto.*;
import com.burgerking.model.OrderEntity;
import com.burgerking.model.OrderStatus;
import com.burgerking.repository.OrderItemRepository;
import com.burgerking.repository.OrderRepository;
import com.burgerking.repository.OrderStatusHistoryRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;

@Service
public class AdminOrderService {

    private final OrderRepository orderRepository;
    private final OrderStatusHistoryRepository statusHistoryRepository;
    private final OrderItemRepository orderItemRepository;

    public AdminOrderService(
            OrderRepository orderRepository,
            OrderStatusHistoryRepository statusHistoryRepository,
            OrderItemRepository orderItemRepository
    ) {
        this.orderRepository = orderRepository;
        this.statusHistoryRepository = statusHistoryRepository;
        this.orderItemRepository = orderItemRepository;
    }

    /* =======================
       ORDER SUMMARY (KPIs)
       ======================= */
    public OrderSummaryDTO getOrderSummary() {

        LocalDateTime startOfToday = LocalDate.now().atStartOfDay();
        LocalDateTime endOfToday = LocalDate.now().plusDays(1).atStartOfDay();

        long totalOrdersToday =
                orderRepository.countOrdersBetween(startOfToday, endOfToday);

        BigDecimal totalRevenueToday =
                orderRepository.sumRevenueBetween(startOfToday, endOfToday);

        // Default counts
        Map<OrderStatus, Long> statusCounts =
                new EnumMap<>(OrderStatus.class);

        for (OrderStatus status : OrderStatus.values()) {
            statusCounts.put(status, 0L);
        }

        // Latest-status counts
        LocalDate today = LocalDate.now();

        LocalDateTime startOfDay = today.atStartOfDay();
        LocalDateTime endOfDay = today.plusDays(1).atStartOfDay();

        List<Object[]> results =
                statusHistoryRepository.getTodayLatestOrderStatusCount(startOfDay, endOfDay);

        for (Object[] row : results) {
            OrderStatus status = (OrderStatus) row[0];
            Long count = (Long) row[1];
            statusCounts.put(status, count);
        }

        return new OrderSummaryDTO(
                totalOrdersToday,
                totalRevenueToday,
                statusCounts.get(OrderStatus.PLACED),
                statusCounts.get(OrderStatus.PREPARING),
                statusCounts.get(OrderStatus.READY)
        );
    }

    /* =======================
       RECENT ORDERS (TABLE)
       ======================= */
    public Page<RecentOrderDTO> getRecentOrders(int page, int size) {

        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(Sort.Direction.DESC, "createdAt")
        );

        return orderRepository.findRecentOrders(pageable);
    }

    /* =======================
       CURRENT ORDER STATUS
       ======================= */
    public OrderStatus getCurrentOrderStatus(Integer orderId) {
        return statusHistoryRepository
                .findLatestStatusByOrderId(orderId, PageRequest.of(0, 1))
                .stream()
                .findFirst()
                .orElse(null);
    }

    /* =======================
       ORDER DETAILS (DRAWER)
       ======================= */
    public OrderDetailsDTO getOrderDetails(Integer orderId) {

        OrderEntity order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new RuntimeException("Order not found"));

        List<OrderItemDTO> items =
                orderItemRepository.findItemsByOrderId(orderId);

        List<OrderStatusTimelineDTO> timeline =
                statusHistoryRepository.findStatusTimeline(orderId);

        return new OrderDetailsDTO(
                order.getId(),
                order.getOrderNumber(),
                order.getTotalAmount(),
                order.getCreatedAt(),
                order.getCreatedBy().getUsername(),
                items,
                timeline
        );
    }
}
