package com.burgerking.controller;

import com.burgerking.model.User;
import com.burgerking.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;

    // Constructor injection (no Lombok)
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // 1️⃣ Add Staff / Admin / Kitchen
    @PostMapping
    public User addUser(@RequestBody User user) {
        return userService.addUser(user);
    }

    // 2️⃣ Get All Users
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // 3️⃣ Update User
    @PutMapping("/{id}")
    public User updateUser(
            @PathVariable Integer id,
            @RequestBody User user
    ) {
        return userService.updateUser(id, user);
    }

    // 4️⃣ Delete User
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Integer id) {
        userService.deleteUser(id);
    }

    // 5️⃣ Toggle Active / Inactive
    @PatchMapping("/{id}/toggle")
    public User toggleUser(@PathVariable Integer id) {
        return userService.toggleUserStatus(id);
    }
}
