package com.burgerking.dto;

public class AdminKpiResponse {

    private long totalDishes;
    private long availableDishes;
    private long outOfStockDishes;
    private long todayOrders;
    private long billingUsers;
    private long kitchenStaff;
    private long admins;

    public AdminKpiResponse(long totalDishes,
                            long availableDishes,
                            long outOfStockDishes,
                            long todayOrders,
                            long admins,
                            long billingUsers,
                            long kitchenStaff) {
        this.totalDishes = totalDishes;
        this.availableDishes = availableDishes;
        this.outOfStockDishes = outOfStockDishes;
        this.todayOrders = todayOrders;
        this.admins = admins;
        this.billingUsers = billingUsers;
        this.kitchenStaff = kitchenStaff;

    }

    // Getters only (immutability is good)
    public long getTotalDishes() { return totalDishes; }
    public long getAvailableDishes() { return availableDishes; }
    public long getOutOfStockDishes() { return outOfStockDishes; }
    public long getTodayOrders() { return todayOrders; }
    public long getBillingUsers() { return billingUsers; }
    public long getKitchenStaff() { return kitchenStaff; }
    public long getAdmins() { return admins; }
}
