package com.estock.mystockmgr.services;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.estock.mystockmgr.dto.InventoryPayload;
import com.estock.mystockmgr.modal.Inventory;
import com.estock.mystockmgr.modal.InventoryCategory;
import com.estock.mystockmgr.repository.InventoryCategoryRepo;
import com.estock.mystockmgr.repository.InventoryRepo;

@Service
@Transactional
public class InventoryManagement {
    @Autowired
    InventoryRepo inventoryRepo;
    @Autowired
    InventoryCategoryRepo inventoryCategoryRepo;
    
    public boolean saveInventorydata(InventoryPayload inventoryPayload) throws Exception{
        Optional<InventoryCategory> category = inventoryCategoryRepo.findById(inventoryPayload.getCategoryId());
        if (category.isPresent()){
        Inventory inventory = new Inventory(inventoryPayload.getInventoryName(),inventoryPayload.getConsumptionRate(),inventoryPayload.getQuantity(),inventoryPayload.getInventoryName(),inventoryPayload.getConsumptionType());
        inventory.setInventoryCategory(category.get());
        inventoryRepo.save(inventory);
        }else{
            throw new Exception("category value is not available");
        }
        return true;
    }

    public boolean updateInventoryData(int inventoryId,InventoryPayload inventoryPayload) throws Exception{
        Optional<InventoryCategory> category = inventoryCategoryRepo.findById(inventoryPayload.getCategoryId());
        if (category.isPresent()){
            Optional<Inventory> inventory = inventoryRepo.findById(inventoryId);
            if (inventory.isPresent()){
            Inventory invdata=inventory.get();
            invdata.setInventoryName(inventoryPayload.getInventoryName());
            invdata.setInventoryImgUrl(inventoryPayload.getInventoryImgUrl());
            invdata.setConsumptionRate(inventoryPayload.getConsumptionRate());
            invdata.setQuantity(inventoryPayload.getQuantity());
            invdata.setInventoryCategory(category.get());
            inventoryRepo.save(invdata);

            }else{
                throw new Exception("Inventory value is not available");
            }
        }else{
            throw new Exception("category value is not available");
        }
        return true;
    }
}
