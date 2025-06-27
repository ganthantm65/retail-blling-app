package com.api.RetailBilling.controller;

import com.api.RetailBilling.model.Products;
import com.api.RetailBilling.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class ProductController {
    @Autowired
    private ProductService productService;

    @PostMapping("/addProducts")
    public Products addProducts(@RequestBody Products products){
        return productService.addProducts(products);
    }
    @GetMapping("/getCategory/{categoryName}")
    public List<Products> getProducts(@PathVariable String categoryName){
        return productService.getProductsByCategory(categoryName);
    }
    @GetMapping("/getProducts/{productName}")
    public List<Products> getProductsByProductName(@PathVariable String productName){
        return productService.getProductByProductName(productName);
    }
}
