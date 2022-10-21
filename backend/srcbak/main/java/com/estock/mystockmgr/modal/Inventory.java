package com.estock.mystockmgr.modal;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Entity
@Data
public class Inventory {

  @Id
  @GeneratedValue(strategy=GenerationType.AUTO)
  private Integer inventoryId;
  @Column(unique = true,nullable = false)
  private String inventoryName;
  @Temporal(TemporalType.DATE)
  private Date inventoryAdded;
  private float consumptionRate;
  private String inventoryImgUrl;
  private String unitName;
  private String consumptionType;
  
  @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
  @JoinColumn(referencedColumnName = "categoryId")
  @JsonIgnore
  private InventoryCategory inventoryCategory;

  @OneToMany(mappedBy = "inventory",cascade = CascadeType.ALL)
  private List<Purchase> purchase;

  @OneToMany(mappedBy = "inventory",cascade = CascadeType.ALL)
  private List<Sales> sales;


  @Transient
  private int categoryId;

  public Inventory(){}
  
  public Inventory(String inventoryName,float consumptionRate,String unitName,String consumptionType){
    this.inventoryName=inventoryName;
    this.consumptionRate=consumptionRate;
    this.inventoryAdded=new Date();
    this.consumptionType =consumptionType.toUpperCase();
    this.unitName=unitName.toUpperCase();    
  } 
  
  public int getCategoryId(){
    return this.inventoryCategory.getCategoryId();
  }
}
