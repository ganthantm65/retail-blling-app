package com.api.RetailBilling.service;

import com.api.RetailBilling.model.Category;
import com.api.RetailBilling.model.Products;
import com.api.RetailBilling.model.ProductsDTO;
import com.api.RetailBilling.repository.CategoryRepo;
import com.api.RetailBilling.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepo categoryRepo;
    public List<ProductsDTO> getAllProducts(){
        return productRepository.findAllProducts();
    }
    public Products addProducts(Products products){
        int categoryId = products.getCategory_no().getId();
        Category category = categoryRepo.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        products.setCategory_no(category);
        return productRepository.save(products);
    }

    public void deleteProduct(Products products){
        productRepository.deleteById(products.getProduct_id());
    }

    public List<Products> getProductsByCategory(String categoryName) {
        return productRepository.findByCategoryName(categoryName);
    }

    public List<Products> getProductByProductName(String productName){
        return productRepository.findByProductName(productName);
    }
}
