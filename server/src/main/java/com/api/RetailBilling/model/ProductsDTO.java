package com.api.RetailBilling.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class ProductsDTO {
    private String product_name;
    private String category_name;
    private String description;
    private String imageUrl;
    private double price;
    private int stock;
    public ProductsDTO(String product_name, String category_name, double price, String description, String imageUrl, int stock) {
        this.product_name = product_name;
        this.category_name = category_name;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this.stock = stock;
    }
}
