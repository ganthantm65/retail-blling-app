package com.api.RetailBilling.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.Check;

import java.util.List;

@Entity
@Data
@Table(name = "purchase")
@Check(constraints = "status IN ('Completed','Rejected','Pending')")
public class Purchase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int purchase_no;

    @ManyToOne
    @JoinColumn(name = "customer_no", nullable = false)
    private Customer customer;

    @Column(nullable = false)
    private String date;

    private double total_amount;

    @Column(nullable = false)
    private String status;

    @Column(nullable = false)
    private String payment_method;

    @OneToMany(mappedBy = "purchase", cascade = CascadeType.ALL)
    private List<PurchasedItem> items;
}
