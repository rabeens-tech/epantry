package com.estock.mystockmgr.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.estock.mystockmgr.dto.ReplishmentPayload;
import com.estock.mystockmgr.modal.Purchase;
import com.estock.mystockmgr.repository.PurchaseRepo;
import com.estock.mystockmgr.services.ReplishmentManagement;

@Controller
public class ReplishmentController {
    @Autowired
    PurchaseRepo replishmentRepo;
    @Autowired
    ReplishmentManagement replishmentManagement;

    @RequestMapping(value="/getall",method=RequestMethod.GET)
    public @ResponseBody ResponseEntity<Iterable<Purchase>> getAllReplishment() {
      // This returns a JSON or XML with the users
        return new ResponseEntity<>(replishmentRepo.findAll(),HttpStatus.OK);
    }

    @RequestMapping(value="/getone/{replishmentId}",method=RequestMethod.GET)
    public @ResponseBody ResponseEntity<Purchase> getAllInventory(@PathVariable(name = "replishmentId",required = true) int id) {
      // This returns a JSON or XML with the users
      if (id>0){
        Purchase replishmentObj=replishmentRepo.findById(id).get();
        if (replishmentObj!=null){
            return new ResponseEntity<Purchase>(replishmentObj,HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); 
        }
      }else{
        return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
      }

    }

    @RequestMapping(value = "/saveall",method=RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<String> saveReplishment(@RequestBody ReplishmentPayload replishmentPayload){
        try{
            replishmentManagement.saveReplishementInfo(replishmentPayload.getNewAdded(), replishmentPayload.getInventoryId());
            return new ResponseEntity<>("Replishment added successfully",HttpStatus.OK);
        }
        catch(Exception ex){
          return new ResponseEntity<>("Unable to update data "+ex.getMessage(),HttpStatus.BAD_REQUEST);
        }
        
    }

    @RequestMapping(value = "/change/{replishementId}",method=RequestMethod.PUT)
    @ResponseBody
    public ResponseEntity<String> UpdateInventoryInCategory(@RequestBody Purchase replishment,@PathVariable("replishementId") int replishementId){
        try{
          replishmentManagement.updateInventoryData(replishementId,replishment);
          return new ResponseEntity<>("Replishment updated successfully",HttpStatus.OK);
        }
        catch(Exception ex){
          return new ResponseEntity<>("Unable to update data "+ex.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }
    
    @RequestMapping(value="/remove/{replishementId}",method = RequestMethod.DELETE)
    @ResponseBody
    public ResponseEntity<String> removeInventory(@PathVariable("replishementId") int replishementId){
      try{
      replishmentManagement.removeReplishment(replishementId);
      return new ResponseEntity<>("Replishment removed successfully",HttpStatus.OK);
      }
      catch(Exception ex){
        return new ResponseEntity<>("Unable to remove:: "+ex.getMessage(),HttpStatus.BAD_REQUEST);
      }
    }    
}
