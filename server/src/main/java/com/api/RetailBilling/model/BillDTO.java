package com.api.RetailBilling.model;

import lombok.Data;

import java.util.List;

@Data
public class BillDTO {
    private Customer customer;
    private Purchase purchase;
    private List<PurchasedItem> purchasedItems;
}
