package com.veiculo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Home {
    
    @GetMapping("/")
    public String index() {
        return "Bem-vindo ao sistema de gerenciamento de veículos";
    }

    @GetMapping("/home")
    public String home () {
        return "Você está mapeando HOME";
    }

    @GetMapping("/soma/{num1}/{num2}")
    public String soma(@PathVariable int num1, @PathVariable int num2) {
        return "Você está mapeando SOMA de " + num1 + " + " + num2 + " = " + (num1 + num2);
    }

}
