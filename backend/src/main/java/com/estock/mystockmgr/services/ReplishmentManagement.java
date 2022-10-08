package com.estock.mystockmgr.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.estock.mystockmgr.modal.Inventory;
import com.estock.mystockmgr.modal.Replishment;
import com.estock.mystockmgr.repository.InventoryRepo;
import com.estock.mystockmgr.repository.ReplishmentRepo;

@Service
public class ReplishmentManagement {
    @Autowired
    ReplishmentRepo replishmentRepo;
    @Autowired
    InventoryRepo inventoryRepo;

    public boolean saveReplishementInfo(float addedQuantity,int InventoryId) throws Exception{
        Optional<Inventory> inventory = inventoryRepo.findById(InventoryId);
        if (inventory.isPresent()){
            Inventory invcat = inventory.get();
            replishmentRepo.save(new Replishment(addedQuantity,invcat));
        }else{
            throw new Exception("Inventory value is not available");
        }
        return true;
    }

    public boolean removeReplishment(int replishementId) {
        replishmentRepo.deleteById(replishementId);
        return true;
    }

    public boolean updateInventoryData(int replishementId, Replishment newrep) throws Exception {
        Optional<Replishment> replishment = replishmentRepo.findById(replishementId);
        if (replishment.isPresent()){
            Replishment data = replishment.get();
            newrep.setReplishmentId(data.getReplishmentId());
            replishmentRepo.save(newrep);
        }else{
            throw new Exception("Replishment value is not available");
        }
        return true;
    }

    
}
