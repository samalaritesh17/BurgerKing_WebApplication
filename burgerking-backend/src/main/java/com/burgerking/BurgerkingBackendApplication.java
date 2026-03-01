package com.burgerking;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = "com.burgerking.model")
@EnableJpaRepositories(basePackages = {
        "com.burgerking.billingportal.repository",
        "com.burgerking.repository",
        "com.burgerking.kitchenportal.repository"
})
public class BurgerkingBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BurgerkingBackendApplication.class, args);
    }
}
