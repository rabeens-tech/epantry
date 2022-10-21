package com.estock.mystockmgr.dto;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;

import com.estock.mystockmgr.controller.InventoryController;
import com.estock.mystockmgr.modal.Inventory;
import com.estock.mystockmgr.modal.Purchase;
import com.estock.mystockmgr.repository.PurchaseRepo;

import lombok.Data;

@Data
public class ReplishmentPayloadResponse{
    
    private Integer purchaseId;
    private Date inventoryAdded;
    private float quantity;
    private float daysToDeplete;
    Inventory inventory;
    private float remainingStock;

   public ReplishmentPayloadResponse(Purchase purchase){
        this.purchaseId=purchase.getPurchaseId();
        this.inventoryAdded=purchase.getInventoryAdded();
        this.quantity=purchase.getQuantity();
        this.daysToDeplete=purchase.getDaysToDeplete();
        this.inventory=purchase.getInventory();        
    }
 
}

