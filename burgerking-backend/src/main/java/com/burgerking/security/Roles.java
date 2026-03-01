package com.burgerking.security;

public final class Roles {

    private Roles() {
    }

    public static String roleNameFromRoleId(Integer roleId) {
        if (roleId == null) {
            return "USER";
        }
        return switch (roleId) {
            case 1 -> "ADMIN";
            case 2 -> "USER";
            case 3 -> "KITCHEN";
            default -> "USER";
        };
    }
}
