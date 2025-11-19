package com.veiculo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.veiculo.dto.VeiculoDTO;
import com.veiculo.entity.Veiculo;
import com.veiculo.mapper.VeiculoMapper;
import com.veiculo.repository.VeiculoRepository;
import com.veiculo.util.ValidaVeiculo;

@Service
public class VeiculoService {
    
    @Autowired
    private VeiculoRepository repository;

    @Transactional
    public VeiculoDTO criar(VeiculoDTO dto) {
        if (dto.getId() != null) {
            throw new IllegalArgumentException("Novo veículo não deve ter ID");
        }
        if (repository.existsByPlaca(dto.getPlaca())) {
            throw new IllegalArgumentException("Já existe veículo com essa placa");
        }
        if (!ValidaVeiculo.isPlacaValida(dto)) {
            throw new IllegalArgumentException("A placa do veículo não é válida");
        }
        Veiculo salvo = repository.save(VeiculoMapper.toEntity(dto));
        return VeiculoMapper.toDto(salvo);
    }

    @Transactional
    public VeiculoDTO atualizar(VeiculoDTO dto) {
        if (!ValidaVeiculo.isPlacaValida(dto)) {
            throw new IllegalArgumentException("A placa do veículo não é válida");
        }
        Veiculo existente = repository.findById(dto.getId()).orElseThrow(() -> new RuntimeException("Veículo não encontrado"));
        existente.setPlaca(dto.getPlaca());
        existente.setCor(dto.getCor());
        existente.setValor(dto.getValor());
        existente.setAno(dto.getAno());
        existente.setDescricao(dto.getDescricao());
        return VeiculoMapper.toDto(repository.save(existente));
    }

    @Transactional
    public void deletar(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Veículo não encontrado");
        }
        repository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public List<VeiculoDTO> listar() {
        return VeiculoMapper.toDTOList(repository.findAll());
    }

    @Transactional(readOnly = true)
    public VeiculoDTO buscarPorId(Long id) {
        return repository.findById(id).map(VeiculoMapper::toDto).orElseThrow(() -> new RuntimeException("Veículo não encontrato"));
    }

    @Transactional(readOnly = true)
    public boolean existePorPlaca(String placa) {
        return repository.existsByPlaca(placa);
    }
}
