package com.estock.mystockmgr.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReplishmentPayload {
    float newAdded;   
    int inventoryId;
}
