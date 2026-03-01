package com.burgerking.dto;

public class LoginResponse {

    private String message;
    private String role;
    private boolean success;
    private String token;
    private Integer userId;
    private String username;

    public LoginResponse(String message, String role, boolean success) {
        this.message = message;
        this.role = role;
        this.success = success;
    }

    public LoginResponse(String message, String role, boolean success, String token, Integer userId, String username) {
        this.message = message;
        this.role = role;
        this.success = success;
        this.token = token;
        this.userId = userId;
        this.username = username;
    }

    public String getMessage() {
        return message;
    }

    public String getRole() {
        return role;
    }

    public boolean isSuccess() {
        return success;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
