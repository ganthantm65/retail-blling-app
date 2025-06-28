package com.api.RetailBilling.repository;

import com.api.RetailBilling.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CategoryRepo extends JpaRepository<Category,Integer> {
    List<Category> findAllByCategoryName(String categoryName);
    @Query("SELECT c.id,c.categoryName FROM Category c")
    List<Object[]> getCategoryNames();
}
