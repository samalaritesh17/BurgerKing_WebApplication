package com.burgerking.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.Map;

@RestController
@RequestMapping("/api/meta")
public class MetaController {

    @GetMapping
    public Map<String, Object> meta() {
        return Map.of(
                "service", "burgerking-backend",
                "time", Instant.now().toString()
        );
    }
}
