package com.estock.mystockmgr.modal;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Purchase {

  @Id
  @GeneratedValue(strategy=GenerationType.AUTO)
  private Integer purchaseId;

  @Temporal(TemporalType.DATE)
  private Date inventoryAdded;
  private float quantity;

  @Transient
  @Getter(value = AccessLevel.NONE)
  private float daysToDeplete;

  @ManyToOne
  @JoinColumn(referencedColumnName = "inventoryId")
  @JsonIgnore
  Inventory inventory;

  public Purchase(float quantity){
    this.inventoryAdded = new Date();
    this.quantity=quantity;
  }
  public Purchase(float quantity,Inventory inventory){
    this.inventoryAdded = new Date();
    this.quantity=quantity;
    this.inventory=inventory;
  }
  
  public boolean shouldBeDeplete(){
    Date datenow = new Date();
    long addedInterval = datenow.getTime()-this.inventoryAdded.getTime();
    long dailyseconds = 24*60*60;
    switch(this.inventory.getConsumptionType()){      
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
  public int calculateDepletion(){
    switch(this.inventory.getConsumptionType()){      
      case "DAILY":        
        return Math.round((float)quantity/this.inventory.getConsumptionRate());
      case "WEEKLY":
        return Math.round((float)quantity*7/this.inventory.getConsumptionRate());
      case "MONTHLY":
        return Math.round((float)quantity*30/this.inventory.getConsumptionRate());
      case "YEARLY":
        return Math.round((float)quantity*365/this.inventory.getConsumptionRate());
    }
    return Math.round((float)quantity/this.inventory.getConsumptionRate());
  }

  public void populateDefaultDate(){
    this.inventoryAdded = new Date();
  }
  

  public float getDaysToDeplete(){
    return Math.round((float)this.quantity/this.inventory.getConsumptionRate());
  }

}
