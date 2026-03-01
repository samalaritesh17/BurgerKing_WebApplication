package com.burgerking.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "order_status_history")
public class OrderStatusHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // 🔗 Many status entries belong to ONE order
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private OrderEntity order;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderStatus status;

    @Column(name = "changed_at", nullable = false)
    private LocalDateTime changedAt = LocalDateTime.now();

    // 🔹 Constructors
    public OrderStatusHistory() {
    }

    public OrderStatusHistory(OrderEntity order, OrderStatus status) {
        this.order = order;
        this.status = status;
        this.changedAt = LocalDateTime.now();
    }

    // 🔹 Getters & Setters

    public Integer getId() {
        return id;
    }

    public OrderEntity getOrder() {
        return order;
    }

    public void setOrder(OrderEntity order) {
        this.order = order;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public LocalDateTime getChangedAt() {
        return changedAt;
    }

    public void setChangedAt(LocalDateTime changedAt) {
        this.changedAt = changedAt;
    }
}
