package com.veiculo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.veiculo.dto.ModeloDTO;
import com.veiculo.entity.Modelo;
import com.veiculo.mapper.ModeloMapper;
import com.veiculo.repository.ModeloRepository;

@Service
public class ModeloService {
    
    @Autowired
    private ModeloRepository repository;


    @Transactional
    public ModeloDTO criar(ModeloDTO dto) {
        if (dto.getId() != null) {
            throw new IllegalArgumentException("Novo modelo não deve ter ID");
        }
        if (repository.existsByNome(dto.getNome())) {
            throw new IllegalArgumentException("Já existe um modelo com esse nome");
        }
        Modelo salvo = repository.save(ModeloMapper.toEntity(dto));
        return ModeloMapper.tDto(salvo);
    }
}
