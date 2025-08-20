package com.veiculo.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.veiculo.dto.FabricanteDTO;
import com.veiculo.entity.Fabricante;
import com.veiculo.mapper.FabricanteMapper;
import com.veiculo.repository.FabricanteRepository;

@Service
public class FabricanteService {
    
    private final FabricanteRepository repository;

    public FabricanteService(FabricanteRepository repository) {
        this.repository = repository;
    }


    @Transactional
    public FabricanteDTO criar(FabricanteDTO dto) {
        if (dto.getId() != null) {
            throw new IllegalArgumentException("Novo fabricante não deve ter ID");
        }
        if (repository.existsByNome(dto.getNome())) {
            throw new IllegalArgumentException("Já existe fabricante com esse nome");
        }
        Fabricante salvo = repository.save(FabricanteMapper.toEntity(dto));
        return FabricanteMapper.toDTO(salvo);
    }
}
