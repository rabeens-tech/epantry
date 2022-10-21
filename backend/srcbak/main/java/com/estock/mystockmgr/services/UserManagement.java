package com.estock.mystockmgr.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.estock.mystockmgr.dto.UserPayload;
import com.estock.mystockmgr.modal.Users;
import com.estock.mystockmgr.repository.UserRepo;


@Service
public class UserManagement {
 @Autowired
 UserRepo userRepo;

 public boolean removeUser(int userId){
    userRepo.deleteById(userId);
    return true;
 }

 public boolean updateUser(UserPayload user,int userId) throws Exception{
    Optional<Users> userdata = userRepo.findById(userId);
        if (userdata.isPresent()){
            Users userold = userdata.get();
            userold.setActive(user.isActive());
            userold.setPassword(user.getPassword());
            userold.setUserEmail(user.getUserEmail());
            userold.setUserName(user.getUserName());
            userold.setUserRole(user.getUserRole());
            userRepo.save(userold);
        }else{
            throw new Exception("User value is not available");
        }
        return true;
 }

}
