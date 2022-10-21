package com.estock.mystockmgr.modal;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;
import lombok.Getter;

@Entity
@Data
@Table(name="users")
public class Users {
    
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;
    @Column(unique = true,nullable = false)
    private String userName;
    @Column(unique=true,nullable = false)
    private String userEmail;
    private String password;
    private String[] userRole = new String[20];
    private boolean isActive;
    
    public void setIsActive(boolean isActive) {
        this.isActive = isActive;
    }
}
