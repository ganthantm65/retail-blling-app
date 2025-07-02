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
    @JoinColumn(name = "purchase_no", nullable = false)
    private Purchase purchase;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Products products;

    @Column(nullable = false)
    private int quantity;

    @Column(nullable = false)
    private double unit_price;

    @Column(nullable = false)
    private double subtotal;
}
