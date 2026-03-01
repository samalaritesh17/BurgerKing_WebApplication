package com.burgerking.billingportal.repository;

import com.burgerking.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BillingUserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByUsernameAndActiveTrue(String username);

}
