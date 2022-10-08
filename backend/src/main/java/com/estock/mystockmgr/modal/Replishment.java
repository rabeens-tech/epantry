package com.estock.mystockmgr.modal;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Replishment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int replishmentId;
    float newAdded;
    Date addedDate;
    boolean mostRecent;

    @OneToOne
    @JoinColumn(referencedColumnName = "id")
    Inventory inventory;
    
    public Replishment(float newAdded,Inventory inventory){
        this.newAdded=newAdded;
        this.addedDate=new Date();
        this.mostRecent=true;
        this.inventory = inventory;
    }
    public Replishment(float newAdded, Date addedDate,boolean mostRecent){
        this.newAdded=newAdded;
        this.addedDate=addedDate;
        this.mostRecent=mostRecent;
    }
}
