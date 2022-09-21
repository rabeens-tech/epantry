package com.estock.mystockmgr.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.estock.mystockmgr.dto.CategoryNames;
import com.estock.mystockmgr.modal.InventoryCategory;
import com.estock.mystockmgr.repository.InventoryCategoryRepo;
import com.estock.mystockmgr.services.CategoryManagement;

@Controller
@RequestMapping(path = "/category")
public class CategoryController {
    @Autowired
    InventoryCategoryRepo inventoryCategoryRepo;
    @Autowired
    CategoryManagement categoryManagement;

    @RequestMapping(value="/getall",method=RequestMethod.GET)
    public @ResponseBody ResponseEntity<Iterable<InventoryCategory>> getAllCategory() {
      // This returns a JSON or XML with the users
        return new ResponseEntity<>(inventoryCategoryRepo.findAll(),HttpStatus.OK);
    }

    @RequestMapping(value="/searchCategoryName",method=RequestMethod.GET)
    public @ResponseBody ResponseEntity<Iterable<InventoryCategory>> getAllCategoryByNames(@RequestBody CategoryNames categoryNames) {
      // This returns a JSON or XML with the users
        return new ResponseEntity<>(inventoryCategoryRepo.findByCategoryNameIn(categoryNames.getInventoryCategory()),HttpStatus.OK);
    }

    @RequestMapping(value="/getone/{categoryId}",method=RequestMethod.GET)
    public @ResponseBody ResponseEntity<InventoryCategory> getAllInventory(@PathVariable(name = "categoryId",required = true) Integer id) {
      // This returns a JSON or XML with the users
      if (id>0){
        Optional<InventoryCategory> categoryObj=inventoryCategoryRepo.findById(id);
        if (categoryObj.isPresent()){
            return new ResponseEntity<InventoryCategory>(categoryObj.get(),HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); 
        }
      }else{
        return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
      }

    }

    @RequestMapping(value = "/save",method=RequestMethod.POST)
    @ResponseBody
    public String saveInventory(@RequestBody InventoryCategory category){
        category.populateDefaultDate();
        System.out.println(category.getCreatedDate());
        System.out.println("here is date");
        inventoryCategoryRepo.save(category);
        return "Category added successfully";
    }
    
    @RequestMapping(value="/remove/{categoryId}",method = RequestMethod.DELETE)
    @ResponseBody
    public ResponseEntity<String> removeInventory(@PathVariable("categoryId") int categoryid){
      try{
      categoryManagement.removeCategory(categoryid);
      return new ResponseEntity<>("category removed successfully",HttpStatus.OK);
      }
      catch(Exception ex){
        return new ResponseEntity<>("Unable to remove:: "+ex.getMessage(),HttpStatus.BAD_REQUEST);
      }
    }

    @RequestMapping(value = "/change/{categoryId}",method=RequestMethod.PUT)
    @ResponseBody
    public ResponseEntity<String> UpdateInventoryInCategory(@RequestBody InventoryCategory invcategory,@PathVariable("categoryId") int categoryId){
        try{
          categoryManagement.updateCategoryData(categoryId,invcategory);
          return new ResponseEntity<>("category updated successfully",HttpStatus.OK);
        }
        catch(Exception ex){
          return new ResponseEntity<>("Unable to update data "+ex.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }
}
