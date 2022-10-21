package com.estock.mystockmgr.modal;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

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
  private String invDescription;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(referencedColumnName = "categoryId")
  @JsonIgnore
  private InventoryCategory inventoryCategory;

  @OneToMany(mappedBy = "inventory",cascade = CascadeType.ALL)
  private List<Purchase> purchase;

  @OneToMany(mappedBy = "inventory",cascade = CascadeType.ALL)
  private List<Sales> sales;

  @Transient
  private int categoryId;
  @Transient
  private float remainingStock;
  @Transient
  private float usedStock;
  @Transient
  private float remainingDaysToDeplete;



  public Inventory(){}
  
  public Inventory(String inventoryName,float consumptionRate,String unitName,String consumptionType,String invDescription){
    this.inventoryName=inventoryName;
    this.consumptionRate=consumptionRate;
    this.inventoryAdded=new Date();
    this.invDescription=invDescription;
    this.consumptionType =consumptionType.toUpperCase();
    this.unitName=unitName.toUpperCase();  
    this.remainingStock= getRemainingStock();
    this.remainingDaysToDeplete= sumTotalDepletionDays();
  } 
  
  public int getCategoryId(){
    return this.inventoryCategory.getCategoryId();
  }

  public float getRemainingStock(){
    float totalPurchase=0;
    float totalSales=0;
    try{
      totalPurchase=(float)this.purchase.stream().mapToDouble((a)->a.getQuantity()).sum();
      }catch(Exception ex){
        System.out.println("Error in getting purchase remaining stock "+ex);
      } 
    try{
      totalSales=(float)this.sales.stream().mapToDouble((a)->a.getQuantity()).sum();
   }
    catch(Exception ex){
      System.out.println("Error in getting sales remaining stock "+ex);
    } 
    return totalPurchase-totalSales;
  }

  public float getUsedStock(){     
    try{
    return (float)this.sales.stream().mapToDouble((a)->a.getQuantity()).sum();
    }catch(Exception ex){
      System.out.println("Error in getting used stock "+ex);
    }
    return 0;
}

  public float sumTotalDepletionDays(){
    try{
      return (float) this.purchase.stream().mapToDouble(a->a.getDaysToDeplete()).sum();
    }catch(Exception ex){
      System.out.println("Error in getting sales sum to deplete"+ex);
    }
    return 0;
  }

  public float getRemainingDaysToDeplete(){
    try{
    if(this.remainingDaysToDeplete<=0){
      this.remainingDaysToDeplete=sumTotalDepletionDays();
    }
    return this.remainingDaysToDeplete;
  }catch(Exception ex){
    System.out.println("Error in remaining days "+ex);
  }
  return 0;
  }
}
