package com.api.RetailBilling.model;

import lombok.Data;

import java.util.List;

@Data
public class PurchaseDTO {
    private int purchase_no;
    private String customer_name;
    private String status;
    private double total_amount;
    private String payment_method;
    private String date;

    public PurchaseDTO(int purchase_no, String status, String customer_name, String payment_method, String date, double total_amount) {
        this.purchase_no = purchase_no;
        this.status = status;
        this.customer_name = customer_name;
        this.payment_method = payment_method;
        this.date = date;
        this.total_amount = total_amount;
    }
}
