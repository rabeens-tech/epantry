package com.estock.mystockmgr.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class InventoryPayload {
    private String inventoryName;
    private float consumptionRate;
    private float quantity;
    private int categoryId;
    private String inventoryImgUrl;
    private String unitName;
    private String consumptionType;
}
