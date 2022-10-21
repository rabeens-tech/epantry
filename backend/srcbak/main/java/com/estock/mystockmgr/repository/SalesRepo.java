package com.estock.mystockmgr.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.estock.mystockmgr.modal.Sales;

@Repository
public interface SalesRepo extends JpaRepository<Sales,Integer> {    
}
