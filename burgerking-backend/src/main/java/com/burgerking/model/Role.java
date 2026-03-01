package com.burgerking.model;

import jakarta.persistence.*;

@Entity                 // 🔥 tells Hibernate: THIS IS A TABLE
@Table(name = "roles")  // optional but recommended
public class Role {

    @Id                                  // 🔑 Primary Key
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true)
    private String name;

    // 🧱 REQUIRED by Hibernate (do not remove)
    public Role() {}

    // Convenience constructor
    public Role(String name) {
        this.name = name;
    }

    // -------- Getters & Setters --------

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
