package com.api.RetailBilling.repository;

import com.api.RetailBilling.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin,Integer> {
    Admin findByAdminName(String adminName);
}
