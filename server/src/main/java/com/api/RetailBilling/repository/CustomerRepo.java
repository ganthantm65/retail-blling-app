package com.api.RetailBilling.repository;

import com.api.RetailBilling.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepo extends JpaRepository<Customer,Integer> {
}
