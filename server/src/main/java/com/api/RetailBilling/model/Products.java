package com.api.RetailBilling.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "products")
public class Products {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int product_id;

    private String product_name;

    @ManyToOne
    @JoinColumn(name = "category_no")
    private Category category_no;

    private String description;

    @Column(nullable = false)
    private int stock=0;

    private double price;

    private String imageUrl;
}
