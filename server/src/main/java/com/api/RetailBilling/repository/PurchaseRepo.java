package com.api.RetailBilling.repository;

import com.api.RetailBilling.model.Purchase;
import com.api.RetailBilling.model.PurchaseDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PurchaseRepo extends JpaRepository<Purchase,Integer> {
    @Query("SELECT new com.api.RetailBilling.model.PurchaseDTO(p.purchase_no, p.status, c.customer_name, p.payment_method, p.date, p.total_amount) FROM Purchase p JOIN p.customer c")
    List<PurchaseDTO> getPurchases();
}
