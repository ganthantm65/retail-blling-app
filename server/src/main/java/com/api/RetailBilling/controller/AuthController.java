package com.api.RetailBilling.controller;

import com.api.RetailBilling.config.JwtUtil;
import com.api.RetailBilling.model.Admin;
import com.api.RetailBilling.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.naming.AuthenticationException;
import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> validateAdmin(@RequestBody Admin admin){
        try {
            Authentication authentication=authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(admin.getAdminName(),admin.getPassWord())
            );
            if (authentication.isAuthenticated()){
                UserDetails authenticatedAdmin=authService.loadUserByUsername(admin.getAdminName());
                String JwtToken=jwtUtil.generateToken(authenticatedAdmin);
                return ResponseEntity.ok(Map.of("token",JwtToken));
            }else{
                return ResponseEntity.status(401).body("Invalid Credential");
            }
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Invalid Credential");
        }
    }
    @PostMapping("/register")
    public Admin addAdmin(@RequestBody Admin admin){
        return authService.addAdmin(admin.getAdminName(),admin.getPassWord());
    }
}
