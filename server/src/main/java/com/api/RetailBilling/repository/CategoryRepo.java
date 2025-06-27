package com.api.RetailBilling.repository;

import com.api.RetailBilling.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepo extends JpaRepository<Category,String> {
    List<Category> findAllByCategoryName(String categoryName);
}
