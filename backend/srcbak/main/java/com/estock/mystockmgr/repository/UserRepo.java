package com.estock.mystockmgr.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.estock.mystockmgr.modal.Users;

@Repository
public interface UserRepo extends JpaRepository<Users,Integer> {
    List<Users> findByUserName(@Param("userName") String userName);    
}
