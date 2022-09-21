package com.estock.mystockmgr.modal;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.Data;

@Data
@Entity
public class InventoryCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer categoryId;
    @Column(unique = true,nullable = false)
    private String categoryName;
    private String categoryDescription;
    @Temporal(TemporalType.DATE)
    private Date createdDate;

    private String categoryImgUrl;

    @OneToMany(mappedBy = "inventoryCategory",cascade = CascadeType.ALL)
    private List<Inventory> inventoryList;

    public InventoryCategory(){}
    InventoryCategory(String categoryName,String categoryDescription){
        this.categoryName=categoryName;
        this.categoryDescription=categoryDescription;
        this.createdDate = new Date();
    }

    public void populateDefaultDate(){
            this.createdDate = new Date();
    }
}
