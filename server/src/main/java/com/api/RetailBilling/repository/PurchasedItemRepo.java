package com.api.RetailBilling.repository;

import com.api.RetailBilling.model.PurchasedItem;
import com.api.RetailBilling.model.PurchasedItemsDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PurchasedItemRepo extends JpaRepository<PurchasedItem,Integer> {
    @Query("SELECT new com.api.RetailBilling.model.PurchasedItemsDTO(p.purchase_no, c.customer_name, p.date, p.status, p.payment_method, pi.quantity, pi.unit_price, pr.product_name) " +
            "FROM Purchase p " +
            "JOIN p.customer c " +
            "JOIN p.items pi " +
            "JOIN pi.products pr")
    List<PurchasedItemsDTO> fetchPurchaseDetailsWithItems();

}
