package com.estock.mystockmgr.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.estock.mystockmgr.modal.InventoryCategory;


public interface InventoryCategoryRepo extends JpaRepository<InventoryCategory,Integer> { 
    List<InventoryCategory> findByCategoryNameIn(List<String> categoryName);
}
