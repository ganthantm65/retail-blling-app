package com.api.RetailBilling.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "Admin")
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int admin_no;

    @Column(name = "admin_name")
    private String adminName;

    @Column(name = "pass_word")
    private String passWord;
}
