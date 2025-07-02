package com.api.RetailBilling.service;

import com.api.RetailBilling.model.Purchase;
import com.api.RetailBilling.model.PurchaseDTO;
import com.api.RetailBilling.repository.PurchaseRepo;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class PurchaseService {
    @Autowired
    private PurchaseRepo purchaseRepo;

    public Purchase addPurchase(Purchase purchase){
        return purchaseRepo.save(purchase);
    }
    @Transactional(readOnly = true)
    public List<PurchaseDTO> getPurchases(){
        return purchaseRepo.getPurchases();
    }
}
