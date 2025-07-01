package com.api.RetailBilling.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.Check;

@Entity
@Data
@Table(name = "purchase")
public class Purchase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int purchase_no;

    @ManyToOne
    @JoinColumn(name = "customer_no")
    private Customer customer;

    @Column(nullable = false)
    private String date;

    private double total_amount;

    @Check(constraints = "status IN ('Completed','Rejected','Pending')")
    private String status;

    @Column(nullable = false)
    private String payment_method;
}
