package com.api.RetailBilling.controller;

import com.api.RetailBilling.model.Products;
import com.api.RetailBilling.model.ProductsDTO;
import com.api.RetailBilling.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    @GetMapping("/getProducts")
    public List<ProductsDTO> getAllProducts(){
        return productService.getAllProducts();
    }
    @GetMapping("/getCategory/{categoryName}")
    public List<Products> getProducts(@PathVariable String categoryName){
        return productService.getProductsByCategory(categoryName);
    }
    @GetMapping("/getProducts/{productName}")
    public List<Products> getProductsByProductName(@PathVariable String productName){
        return productService.getProductByProductName(productName);
    }
    @DeleteMapping("/deleteProducts")
    public ResponseEntity<?> deleteProduct(@RequestBody Products products){
        productService.deleteProduct(products);
        Map<String,String > response=new HashMap<>();
        response.put("message","Deleted Successfully");
        return ResponseEntity.ok(response);
    }
}
