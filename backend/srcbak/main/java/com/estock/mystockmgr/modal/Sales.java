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

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Sales {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer salesId;
    @Temporal(TemporalType.DATE)
    private Date inventoryAdded;
    private float quantity;

    @ManyToOne
    @JoinColumn(referencedColumnName = "inventoryId")
    @JsonIgnore
    Inventory inventory;

    public Sales(float quantity){
        this.quantity= quantity;
        this.inventoryAdded=new Date();
    }
    
}
