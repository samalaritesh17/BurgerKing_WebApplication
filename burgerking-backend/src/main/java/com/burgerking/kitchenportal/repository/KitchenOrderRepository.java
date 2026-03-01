package com.burgerking.kitchenportal.repository;

import com.burgerking.model.OrderEntity;
import com.burgerking.model.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KitchenOrderRepository extends JpaRepository<OrderEntity, Integer> {

    List<OrderEntity> findByStatusInOrderByCreatedAtAsc(List<OrderStatus> statuses);

}
