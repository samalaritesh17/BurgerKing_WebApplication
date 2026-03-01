package com.burgerking.repository;

import com.burgerking.dto.OrderStatusTimelineDTO;
import com.burgerking.model.OrderStatus;
import com.burgerking.model.OrderStatusHistory;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface OrderStatusHistoryRepository
        extends JpaRepository<OrderStatusHistory, Integer> {

    @Query("""
        SELECT h.status
        FROM OrderStatusHistory h
        WHERE h.order.id = :orderId
        ORDER BY h.changedAt DESC
    """)
    List<OrderStatus> findLatestStatusByOrderId(
            @Param("orderId") Integer orderId,
            Pageable pageable
    );

    @Query("""
    SELECT h.status, COUNT(h)
    FROM OrderStatusHistory h
    WHERE h.changedAt = (
        SELECT MAX(h2.changedAt)
        FROM OrderStatusHistory h2
        WHERE h2.order.id = h.order.id
    )
    AND h.changedAt >= :startOfDay
    AND h.changedAt < :endOfDay
    GROUP BY h.status
""")
    List<Object[]> getTodayLatestOrderStatusCount(
            @Param("startOfDay") LocalDateTime startOfDay,
            @Param("endOfDay") LocalDateTime endOfDay
    );



    @Query("""
    SELECT new com.burgerking.dto.OrderStatusTimelineDTO(
        h.status,
        h.changedAt
    )
    FROM OrderStatusHistory h
    WHERE h.order.id = :orderId
    ORDER BY h.id ASC
""")
    List<OrderStatusTimelineDTO> findStatusTimeline(@Param("orderId") Integer orderId);
}
