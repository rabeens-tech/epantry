package com.estock.mystockmgr.services;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.estock.mystockmgr.modal.Users;
import com.estock.mystockmgr.repository.UserRepo;

class MyUserDetails implements UserDetails{
    
    private String userName;
    private String userEmail;
    private String password;
    private String[] userRole;
    private boolean isActive;

    public MyUserDetails(Users  user){
        this.userName=user.getUserName();
        this.userEmail=user.getUserEmail();
        this.password=user.getPassword();
        this.userRole=user.getUserRole();
        this.isActive=user.isActive();
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Arrays.asList(new SimpleGrantedAuthority("ADMIN"));
    }

    public String getUserEmail(){
        return this.userEmail;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.userName;
    }

    @Override
    public boolean isAccountNonExpired() {
        return this.isActive;
    }

    @Override
    public boolean isAccountNonLocked() {
        return this.isActive;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return this.isActive;
    }

    @Override
    public boolean isEnabled() {
        return this.isActive;
    }

}

@Service
public class CustomUserDetailsServiceManager implements UserDetailsService{
        
    @Autowired
    UserRepo userRepo;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        List<Users> userdata = userRepo.findByUserName(username);
         MyUserDetails myUserDetail= new MyUserDetails(userdata.get(0));
         if (myUserDetail.getUsername().isEmpty()){
            throw new UsernameNotFoundException("No user available, please check your credential for :"+username);
         }
         return myUserDetail;
    }

}
