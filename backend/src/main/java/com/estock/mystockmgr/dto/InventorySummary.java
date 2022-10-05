package com.estock.mystockmgr.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class InventorySummary {    
    public int itemCount;
    public String itemStatus;
}
