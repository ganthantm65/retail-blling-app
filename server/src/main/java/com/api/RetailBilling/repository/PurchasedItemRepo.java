package com.api.RetailBilling.repository;

import com.api.RetailBilling.model.PurchasedItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PurchasedItemRepo extends JpaRepository<PurchasedItem,Integer> {
}
