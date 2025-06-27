package com.api.RetailBilling.controller;

import com.api.RetailBilling.model.Category;
import com.api.RetailBilling.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.http.HttpRequest;
import java.util.List;

@CrossOrigin()
@RestController
@RequestMapping("/api")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @PostMapping("/addCategory")
    public ResponseEntity<?> addCategory(@RequestBody Category category){
        try{
            System.out.println(category.toString());
            Category addedCategory=categoryService.addCategory(category);
            return ResponseEntity.ok(addedCategory);
        }catch (Exception e){
            return  ResponseEntity.status(400).body("Invalid Data");
        }
    }
    @GetMapping("/categories")
    public List<Category> getCategoryList(){
        return categoryService.getCategoryList();
    }
}
