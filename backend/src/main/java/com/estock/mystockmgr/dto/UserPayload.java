package com.estock.mystockmgr.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserPayload {
    private String userName;
    private String userEmail;
    private String password;
    private String[] userRole = new String[20];
    private boolean isActive;
}
