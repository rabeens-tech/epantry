package com.estock.mystockmgr.services;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.estock.mystockmgr.modal.InventoryCategory;
import com.estock.mystockmgr.repository.InventoryCategoryRepo;
import com.estock.mystockmgr.repository.InventoryRepo;

@Service
@Transactional
public class CategoryManagement {
    @Autowired
    InventoryCategoryRepo inventoryCategoryRepo;
    @Autowired
    InventoryRepo inventoryRepo;


    public boolean removeCategory(int categoryId){
        inventoryCategoryRepo.deleteById(categoryId);
        return true;
    }

    public boolean updateCategoryData(int categoryId,InventoryCategory inventoryCategory) throws Exception{
        Optional<InventoryCategory> category = inventoryCategoryRepo.findById(categoryId);
        if (category.isPresent()){
            InventoryCategory invcat = category.get();
            invcat.setCategoryName(inventoryCategory.getCategoryName());
            invcat.setCategoryDescription(inventoryCategory.getCategoryDescription());
            invcat.setCategoryImgUrl(inventoryCategory.getCategoryImgUrl());
            inventoryCategoryRepo.save(invcat);
        }else{
            throw new Exception("category value is not available");
        }
        return true;
    }
}
