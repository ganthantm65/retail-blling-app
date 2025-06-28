package com.api.RetailBilling.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "Category")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String categoryName;

    private String imageUrl;
}

