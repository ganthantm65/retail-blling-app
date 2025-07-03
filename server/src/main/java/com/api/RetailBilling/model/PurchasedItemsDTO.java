package com.api.RetailBilling.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PurchasedItemsDTO {
    private int purchaseNo;
    private String customerName;
    private String date;
    private String status;
    private String paymentMethod;
    private int quantity;
    private double unitPrice;
    private String productName;
}

