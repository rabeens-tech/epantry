package com.estock.mystockmgr.modal;

import java.util.Date;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
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

@Entity
@Data
public class Inventory {

  @Id
  @GeneratedValue(strategy=GenerationType.AUTO)
  private Integer id;
  @Column(unique = true,nullable = false)
  private String inventoryName;
  @Temporal(TemporalType.DATE)
  private Date inventoryAdded;
  private float consumptionRate;
  private int quantity;
  private String inventoryImgUrl;
  private String unitName;
  private String consumptionType;

  @Transient
  @Getter(value = AccessLevel.NONE)
  private float daysToDeplete;
  
  @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
  @JoinColumn(referencedColumnName = "categoryId")
  @JsonIgnore
  private InventoryCategory inventoryCategory;

  @Transient
  private int categoryId;

  public Inventory(){}
  
  public Inventory(String inventoryName,float consumptionRate, int quantity,String unitName,String consumptionType){
    this.inventoryName=inventoryName;
    this.consumptionRate=consumptionRate;
    this.quantity=quantity;
    this.inventoryAdded=new Date();
    this.consumptionType =consumptionType.toUpperCase();
    this.unitName=unitName.toUpperCase();    
    this.daysToDeplete=calculateDepletion();
  }
  
  public int calculateDepletion(){
    switch(this.consumptionType){      
      case "DAILY":        
        return Math.round((float)quantity/consumptionRate);
      case "WEEKLY":
        return Math.round((float)quantity*7/consumptionRate);
      case "MONTHLY":
        return Math.round((float)quantity*30/consumptionRate);
      case "YEARLY":
        return Math.round((float)quantity*365/consumptionRate);
    }
    return Math.round((float)quantity/consumptionRate);
  }

  public void populateDefaultDate(){
    this.inventoryAdded = new Date();
  }
  

  public float getDaysToDeplete(){
    return Math.round((float)this.quantity/this.consumptionRate);
  }

  public int getCategoryId(){
    return this.inventoryCategory.getCategoryId();
  }
}
