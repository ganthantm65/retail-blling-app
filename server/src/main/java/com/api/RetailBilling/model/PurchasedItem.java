package com.api.RetailBilling.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "purchased_item")
public class PurchasedItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int item_no;

    @ManyToOne
    @JoinColumn(name = "purchase_no")
    private Purchase purchase;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Products products;

    private int quantity;

    private double unit_price;
}
