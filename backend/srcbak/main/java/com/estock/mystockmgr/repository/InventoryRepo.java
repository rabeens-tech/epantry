package com.estock.mystockmgr.repository;

import java.util.Optional;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.estock.mystockmgr.modal.Inventory;
import com.estock.mystockmgr.modal.InventoryCategory;

@Repository
public interface InventoryRepo extends JpaRepository<Inventory,Integer>{ 

@Query("Delete from Inventory inv where inv.inventoryCategory=:inventoryCategory")
void removeByInventoryCategory(@Param("inventoryCategory")  InventoryCategory inventoryCategory);

Optional<Inventory> findOneByInventoryName(String inventoryName);

}


