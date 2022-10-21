package com.estock.mystockmgr.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.estock.mystockmgr.dto.PurchasedInventory;
import com.estock.mystockmgr.modal.Inventory;
import com.estock.mystockmgr.modal.Purchase;

@Repository
public interface PurchaseRepo extends JpaRepository<Purchase,Integer> {
    Optional<Purchase> findOneByInventoryOrderByPurchaseIdDesc(Inventory inventory);

    @Query("select  new com.estock.mystockmgr.dto.PurchasedInventory(prch.inventory,sum(prch.quantity),COALESCE(sum(sales.quantity),0),COALESCE(max(sales.inventoryAdded),prch.inventoryAdded)) from Purchase AS prch left join Sales AS sales on prch.inventory=sales.inventory GROUP BY prch.inventory")
    List<PurchasedInventory> listPurchasedInventory();

    @Query("select sum(prch.quantity)-COALESCE(sum(sales.quantity),0) from Purchase AS prch left join Sales AS sales on prch.inventory=sales.inventory where prch.inventory=:inventory  GROUP BY prch.inventory")
    float getAvailableStockForInventory(@Param("inventory") Inventory inventory);
    
}
