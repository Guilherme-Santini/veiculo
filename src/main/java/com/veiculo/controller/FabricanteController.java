package com.veiculo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.veiculo.dto.FabricanteDTO;
import com.veiculo.service.FabricanteService;

@RestController //gerencia as requisições
@RequestMapping("/api/fabricantes")
public class FabricanteController {

    @Autowired
    private FabricanteService service;
    
    @GetMapping
    public List<FabricanteDTO> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public FabricanteDTO buscar(@PathVariable Long id){
        return service.buscarPorId(id);
    }

    @PostMapping
    public ResponseEntity<FabricanteDTO> criar(@RequestBody FabricanteDTO dto) {
        FabricanteDTO criado = service.criar(dto);
        return ResponseEntity.created(null).body(criado);
    }

    @PutMapping("/{id}")
    public FabricanteDTO atualizar(@PathVariable Long id, @RequestBody FabricanteDTO dto) {
        return service.atualizar(id, dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
    


}
