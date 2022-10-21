package com.estock.mystockmgr.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.estock.mystockmgr.modal.InventoryCategory;


@Repository
public interface InventoryCategoryRepo extends JpaRepository<InventoryCategory,Integer> { 
    List<InventoryCategory> findByCategoryNameIn(List<String> categoryName);
}
