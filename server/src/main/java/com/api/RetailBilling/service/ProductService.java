package com.api.RetailBilling.service;

import com.api.RetailBilling.model.Products;
import com.api.RetailBilling.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public Products addProducts(Products products){
        return productRepository.save(products);
    }

    public List<Products> getProductsByCategory(String categoryName) {
        return productRepository.findByCategoryName(categoryName);
    }

    public List<Products> getProductByProductName(String productName){
        return productRepository.findByProductName(productName);
    }
}
