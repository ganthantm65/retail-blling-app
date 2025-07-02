package com.api.RetailBilling.service;

import com.api.RetailBilling.model.PurchasedItem;
import com.api.RetailBilling.repository.PurchasedItemRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class PurchasedItemsService {
    @Autowired
    private PurchasedItemRepo purchasedItemRepo;

    public void addPurchasedItems(List<PurchasedItem> purchasedItems){
        purchasedItemRepo.saveAll(purchasedItems);
    }
}
