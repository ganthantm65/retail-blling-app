package com.api.RetailBilling.repository;

import com.api.RetailBilling.model.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Products,Integer> {
    @Override
    List<Products> findAll();
    @Query("SELECT p FROM Products p JOIN p.category_no c WHERE LOWER(TRIM(c.categoryName)) = LOWER(TRIM(:name))")
    List<Products> findByCategoryName(@Param("name") String categoryName);

    @Query("SELECT p FROM Products p JOIN p.category_no c WHERE LOWER(TRIM(p.product_name)) LIKE LOWER(TRIM(:name))")
    List<Products> findByProductName(@Param("name") String name);

}
