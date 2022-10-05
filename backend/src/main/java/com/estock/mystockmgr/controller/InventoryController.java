package com.estock.mystockmgr.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.estock.mystockmgr.dto.InventoryPayload;
import com.estock.mystockmgr.dto.InventorySummary;
import com.estock.mystockmgr.modal.Inventory;
import com.estock.mystockmgr.repository.InventoryRepo;
import com.estock.mystockmgr.services.InventoryManagement;

@RestController
@RequestMapping(path = "/inventory")
public class InventoryController {

    @Autowired
    InventoryRepo inventoryRepo;
    @Autowired
    InventoryManagement inventoryManagement;

    @RequestMapping(value="/getall",method=RequestMethod.GET)
    public @ResponseBody ResponseEntity<Iterable<Inventory>> getAllInventory() {
      // This returns a JSON or XML with the users
        return new ResponseEntity<>(inventoryRepo.findAll(),HttpStatus.OK);
    }

    @RequestMapping(value="/getone/{inventoryId}",method=RequestMethod.GET)
    public @ResponseBody ResponseEntity<Inventory> getAllInventory(@PathVariable(name = "inventoryId",required = true) int id) {
      // This returns a JSON or XML with the users
      if (id>0){
        Inventory inventoryObj=inventoryRepo.findById(id).get();
        if (inventoryObj!=null){
            return new ResponseEntity<Inventory>(inventoryObj,HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); 
        }
      }else{
        return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
      }

    }

    @RequestMapping(value = "/saveall",method=RequestMethod.POST)
    @ResponseBody
    public String saveInventory(@RequestBody Inventory inventory){
        inventory.populateDefaultDate();
        inventoryRepo.save(inventory);
        return "Inventory added successfully";
    }

    @RequestMapping(value = "/saveincategory",method=RequestMethod.POST)
    @ResponseBody
    public String saveInventoryInCategory(@RequestBody InventoryPayload inventory){
        try{
          inventoryManagement.saveInventorydata(inventory);
          return "Inventory added successfully";
        }
        catch(Exception ex){
          return "Unable to save data "+ex.getMessage();
        }
    }

    @RequestMapping(value = "/change/{inventoryId}",method=RequestMethod.PUT)
    @ResponseBody
    public ResponseEntity<String> UpdateInventoryInCategory(@RequestBody InventoryPayload inventory,@PathVariable("inventoryId") int inventoryId){
        try{
          inventoryManagement.updateInventoryData(inventoryId,inventory);
          return new ResponseEntity<>("Inventory updated successfully",HttpStatus.OK);
        }
        catch(Exception ex){
          return new ResponseEntity<>("Unable to update data "+ex.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }
    
    @RequestMapping(path="/invsummary",method = RequestMethod.GET)
    public Map<String,InventorySummary>  getInventorySummary(){
      return inventoryManagement.generateSummary(inventoryRepo.findAll());
    }    
}
