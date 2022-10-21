package com.estock.mystockmgr.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.estock.mystockmgr.dto.PurchasedInventory;
import com.estock.mystockmgr.modal.Inventory;
import com.estock.mystockmgr.modal.Purchase;

@Repository
public interface PurchaseRepo extends JpaRepository<Purchase,Integer> {
    Optional<Purchase> findOneByInventoryOrderByPurchaseIdDesc(Inventory inventory);

    @Query("select  new com.estock.mystockmgr.dto.PurchasedInventory(prch.inventory,sum(prch.quantity),sum(sales.quantity),max(sales.inventoryAdded)) from Purchase AS prch inner join Sales AS sales on prch.inventory=sales.inventory GROUP BY prch.inventory")
    List<PurchasedInventory> listPurchasedInventory();
    
}
