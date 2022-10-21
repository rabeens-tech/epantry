package com.estock.mystockmgr.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;
import java.util.stream.Stream;

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
import com.estock.mystockmgr.dto.ReplishmentPayloadResponse;
import com.estock.mystockmgr.modal.Purchase;
import com.estock.mystockmgr.repository.PurchaseRepo;
import com.estock.mystockmgr.services.ReplishmentManagement;

@Controller
@RequestMapping(path = "/replishment")
public class ReplishmentController {
    @Autowired
    PurchaseRepo replishmentRepo;
    @Autowired
    ReplishmentManagement replishmentManagement;

    @RequestMapping(value="/getall",method=RequestMethod.GET)
    public @ResponseBody ResponseEntity<List<ReplishmentPayloadResponse>> getAllReplishment() {
      // This returns a JSON or XML with the users
        Iterable<Purchase> purchase= replishmentRepo.findAll();
        List<ReplishmentPayloadResponse> response= new ArrayList<>();
        try{
          // List<ReplishmentPayloadResponse> response= Stream.generate(()->purchase.iterator().next()).map((p)-> new ReplishmentPayloadResponse(p)).collect(Collectors.toList());
          purchase.forEach((i)->{
            ReplishmentPayloadResponse replishmentPayloadResponse = new ReplishmentPayloadResponse(i);
            replishmentPayloadResponse.setRemainingStock(replishmentRepo.getAvailableStockForInventory(i.getInventory()));
            response.add(replishmentPayloadResponse);
          });
          return new ResponseEntity<>(response,HttpStatus.OK);
        }catch(NoSuchElementException ex){
            return new ResponseEntity<>(null,HttpStatus.NO_CONTENT);
         }     
    }

    @RequestMapping(value="/getone/{replishmentId}",method=RequestMethod.GET)
    public @ResponseBody ResponseEntity<Purchase> getAllInventory(@PathVariable(name = "replishmentId",required = true) int id) {
      // This returns a JSON or XML with the users
      if (id>0){
        Purchase replishmentObj;
        try{
          replishmentObj=replishmentRepo.findById(id).get();
        }catch(NoSuchElementException ex){
          return new ResponseEntity<>(HttpStatus.NOT_FOUND); 

        }
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
