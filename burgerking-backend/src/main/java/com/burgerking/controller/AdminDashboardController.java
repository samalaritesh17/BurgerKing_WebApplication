package com.burgerking.controller;

import com.burgerking.dto.AdminKpiResponse;
import com.burgerking.service.AdminDashboardService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/dashboard")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminDashboardController {

    private final AdminDashboardService dashboardService;

    public AdminDashboardController(AdminDashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/kpis")
    public AdminKpiResponse getDashboardKpis() {
        return dashboardService.getDashboardKpis();
    }
}
