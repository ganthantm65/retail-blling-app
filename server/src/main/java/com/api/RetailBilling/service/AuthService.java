package com.api.RetailBilling.service;

import com.api.RetailBilling.model.Admin;
import com.api.RetailBilling.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthService implements UserDetailsService {
    @Autowired
    private AdminRepository adminRepo;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public Admin addAdmin(String adminName,String passWord){
        passWord=passwordEncoder.encode(passWord);
        Admin savedAdmin=new Admin();
        savedAdmin.setAdminName(adminName);
        savedAdmin.setPassWord(passWord);
        adminRepo.save(savedAdmin);
        return savedAdmin;
    }
    public List<Admin> getAdminList(){
        return adminRepo.findAll();
    }
    @Override
    public UserDetails loadUserByUsername(String adminName) throws UsernameNotFoundException{
        Admin admin=adminRepo.findByAdminName(adminName);
        if(admin !=null){
            return User.builder()
                    .username(admin.getAdminName())
                    .password(admin.getPassWord())
                    .roles("ADMIN")
                    .build();
        }
        throw new UsernameNotFoundException("Admin not found");
    }
}
