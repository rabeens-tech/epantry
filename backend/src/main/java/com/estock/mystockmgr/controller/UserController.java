package com.estock.mystockmgr.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.estock.mystockmgr.dto.UserPayload;
import com.estock.mystockmgr.modal.Users;
import com.estock.mystockmgr.repository.UserRepo;
import com.estock.mystockmgr.services.UserManagement;

@Controller
@RequestMapping(path="/users")
public class UserController {
    
    @Autowired
    UserRepo userRepo;
    @Autowired
    UserManagement userManagement;

    @RequestMapping(value="/save",method = RequestMethod.POST)
    @ResponseBody
    public String saveUser(@RequestBody Users user){
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        user.setPassword(encoder.encode(user.getPassword()));
        userRepo.save(user);
        return "User data saved successfully";
    }

    @RequestMapping(value="/getall",method=RequestMethod.GET)
    public @ResponseBody ResponseEntity<Iterable<Users>> getAllCategory() {
      // This returns a JSON or XML with the users
        return new ResponseEntity<>(userRepo.findAll(),HttpStatus.OK);
    }

    @RequestMapping(value="/getone/{userId}",method=RequestMethod.GET)
    public @ResponseBody ResponseEntity<Users> getAllInventory(@PathVariable(name = "userId",required = true) Integer id) {
      // This returns a JSON or XML with the users
      if (id>0){
        Optional<Users> userObj=userRepo.findById(id);
        if (userObj.isPresent()){
            return new ResponseEntity<Users>(userObj.get(),HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); 
        }
      }else{
        return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
      }

    }
    @RequestMapping(value="/remove/{userId}",method = RequestMethod.DELETE)
    @ResponseBody
    public ResponseEntity<String> removeUser(@PathVariable("userId") int userId){
      try{
      userManagement.removeUser(userId);
      return new ResponseEntity<>("User removed successfully",HttpStatus.OK);
      }
      catch(Exception ex){
        return new ResponseEntity<>("Unable to remove:: "+ex.getMessage(),HttpStatus.BAD_REQUEST);
      }
    }

    @RequestMapping(value = "/change/{userId}",method=RequestMethod.PUT)
    @ResponseBody
    public ResponseEntity<String> UpdateInventoryInCategory(@RequestBody UserPayload user,@PathVariable("userId") int userId){
        try{
          userManagement.updateUser(user,userId);
          return new ResponseEntity<>("category updated successfully",HttpStatus.OK);
        }
        catch(Exception ex){
          return new ResponseEntity<>("Unable to update data "+ex.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }
}
