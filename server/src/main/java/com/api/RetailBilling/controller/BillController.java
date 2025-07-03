package com.api.RetailBilling.controller;

import com.api.RetailBilling.model.*;
import com.api.RetailBilling.service.CustomerService;
import com.api.RetailBilling.service.PurchaseService;
import com.api.RetailBilling.service.PurchasedItemsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class BillController {
    @Autowired
    private CustomerService customerService;

    @Autowired
    private PurchaseService purchaseService;

    @Autowired
    private PurchasedItemsService purchasedItemsService;

    @PostMapping("/createBill")
    public ResponseEntity<?> createPayment(@RequestBody BillDTO billDTO){
        Map<String,String> response=new HashMap<>();
        try{
            Customer customer=customerService.addCustomer(billDTO.getCustomer());
            Purchase purchase=billDTO.getPurchase();
            purchase.setCustomer(customer);
            Purchase addedPurchase=purchaseService.addPurchase(purchase);
            List<PurchasedItem> purchasedItems=billDTO.getPurchasedItems();
            for(PurchasedItem item:purchasedItems){
                item.setPurchase(addedPurchase);
            }
            purchasedItemsService.addPurchasedItems(purchasedItems);
            response.put("message", "created successfully");
            return ResponseEntity.ok(response);

        }catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(400).body(response.put("message", e.getMessage()));
        }
    }

    @GetMapping("/getPurchases")
    public List<PurchaseDTO> getPurchase(){
        return purchaseService.getPurchases();
    }

    @GetMapping("/getPurchasedItems")
    public List<PurchasedItemsDTO> getPurchasedItems(){
        return purchasedItemsService.getPurchasedItems();
    }
}
