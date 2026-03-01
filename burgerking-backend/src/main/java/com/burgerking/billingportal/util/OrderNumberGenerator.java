package com.burgerking.billingportal.util;

import java.util.Random;

public class OrderNumberGenerator {

    public static String generateOrderNumber() {
        Random random = new Random();
        int number = 1000 + random.nextInt(9000);
        return "BK" + number;
    }
}
