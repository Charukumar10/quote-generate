package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.example.demo.config.FirebaseConfig;

@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        // 🔥 Initialize Firebase
        FirebaseConfig.initialize();

        SpringApplication.run(DemoApplication.class, args);
    }
}