package com.estock.mystockmgr.dto;

import java.util.Date;

import com.estock.mystockmgr.modal.Inventory;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class PurchasedInventory{
    private Inventory inventory;
    private double sumPurchase;
    private double sumSales;
    private Date lastUpdateSale;
}
