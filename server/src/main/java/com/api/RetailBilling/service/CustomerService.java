package com.api.RetailBilling.service;

import com.api.RetailBilling.model.Customer;
import com.api.RetailBilling.repository.CustomerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class CustomerService {
    @Autowired
    private CustomerRepo customerRepo;

    public Customer addCustomer(Customer customer){
        return customerRepo.save(customer);
    }
}
