package com.burgerking.repository;

import com.burgerking.dto.OrderItemDTO;
import com.burgerking.model.OrderItem;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Integer> {

    @Modifying
    @Query("""
        DELETE FROM OrderItem oi
        WHERE oi.dish.id = :dishId
    """)
    void deleteByDishId(@Param("dishId") Integer dishId);

    @Query("""
        SELECT new com.burgerking.dto.OrderItemDTO(
            oi.dishName,
            oi.quantity,
            oi.price
        )
        FROM OrderItem oi
        WHERE oi.order.id = :orderId
    """)
    List<OrderItemDTO> findItemsByOrderId(@Param("orderId") Integer orderId);
}
