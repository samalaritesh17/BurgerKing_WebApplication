package com.burgerking.repository;

import com.burgerking.dto.RecentOrderDTO;
import com.burgerking.model.OrderStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.burgerking.model.OrderEntity;
import org.springframework.data.repository.query.Param;

import org.springframework.data.domain.Pageable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public interface OrderRepository extends JpaRepository<OrderEntity, Integer> {

    @Query("""
        SELECT COUNT(o)
        FROM OrderEntity o
        WHERE o.createdAt >= :start
          AND o.createdAt < :end
    """)
    long countOrdersBetween(
            @Param("start") LocalDateTime start,
            @Param("end") LocalDateTime end
    );

    @Query("""
        SELECT COALESCE(SUM(o.totalAmount), 0)
        FROM OrderEntity o
        WHERE o.createdAt BETWEEN :start AND :end
    """)
    BigDecimal sumRevenueBetween(
            @Param("start") LocalDateTime start,
            @Param("end") LocalDateTime end
    );

    long countByStatus(OrderStatus status);

    @Query("""
    SELECT new com.burgerking.dto.RecentOrderDTO(
        o.id,
        o.orderNumber,
        o.totalAmount,
        h.status,
        o.createdAt
    )
    FROM OrderEntity o
    JOIN OrderStatusHistory h
      ON h.id = (
          SELECT MAX(h2.id)
          FROM OrderStatusHistory h2
          WHERE h2.order = o
      )
""")
    Page<RecentOrderDTO> findRecentOrders(Pageable pageable);

    boolean existsByOrderNumber(String orderNumber);

}
