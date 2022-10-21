package com.estock.mystockmgr.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.estock.mystockmgr.dto.PurchasedInventory;
import com.estock.mystockmgr.modal.Inventory;
import com.estock.mystockmgr.modal.Sales;
import com.estock.mystockmgr.repository.PurchaseRepo;
import com.estock.mystockmgr.repository.SalesRepo;

@Controller
@RequestMapping(path = "/sales")
public class SalesController {
    @Autowired
    PurchaseRepo purchaseRepo;

    @Autowired
    SalesRepo salesRepo;

    @RequestMapping(value = "/autosales",method = RequestMethod.GET)
    @ResponseBody
    public String triggerSales(){
        List<PurchasedInventory> allInventory= purchaseRepo.listPurchasedInventory();
        if (allInventory.size()>0){
        for(PurchasedInventory inventory: allInventory){            
            Inventory currentinInventory = inventory.getInventory();
            if ((inventory.getSumSales()+currentinInventory.getConsumptionRate())<inventory.getSumPurchase() & shouldBeDeplete(currentinInventory, inventory.getLastUpdateSale())){
                Sales sales = new Sales(currentinInventory.getConsumptionRate());
                sales.setInventory(currentinInventory);
                salesRepo.save(sales);                
            }else{
              System.out.println("no depletipn for "+currentinInventory.getInventoryId());
               //do nothing
            }
        }
        return  "Sales automation success";
      }else{
          return  "No data suitable for Sales automation.";

        }
    }

    public boolean shouldBeDeplete(Inventory inventory,Date recentchange){
        Date datenow = new Date();
        long addedInterval = datenow.getTime()-recentchange.getTime();
        long dailyseconds = 1000*24*60*60;
        switch(inventory.getConsumptionType()){      
          case "DAILY":        
            return addedInterval>dailyseconds;
          case "WEEKLY":
            return addedInterval>dailyseconds*7;
          case "MONTHLY":
            return addedInterval>dailyseconds*30;
          case "YEARLY":
            return addedInterval>dailyseconds*365;
        }
        return false;
      }
}
