package com.estock.mystockmgr.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HomeController {

    @RequestMapping(path  = "/index", method=RequestMethod.GET)
    @ResponseBody
    public String index(){
        return "!!! WELCOME TO THE PANTRY APPLICATION !!!";
    }

    @RequestMapping(path="/login", method=RequestMethod.GET)
    public String login(){
        return "login";
    }



    
}
