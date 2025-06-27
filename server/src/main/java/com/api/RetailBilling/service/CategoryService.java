package com.api.RetailBilling.service;

import com.api.RetailBilling.model.Category;
import com.api.RetailBilling.repository.CategoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepo categoryRepo;

    public Category addCategory(Category category) throws IOException {
        return categoryRepo.save(category);
    }
    public List<Category> getCategoryList(){
        return categoryRepo.findAll();
    }
    public  List<Category> getCategory(String categoryName){
        return categoryRepo.findAllByCategoryName(categoryName);
    }
}
