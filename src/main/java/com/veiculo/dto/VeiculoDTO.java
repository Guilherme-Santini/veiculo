package com.veiculo.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.veiculo.entity.Modelo;

public class VeiculoDTO {
    private Long id;
    private String placa;
    private String cor;
    private BigDecimal valor;
    private Integer ano;
    private String descricao;
    private LocalDateTime dataCadastro;
    private Modelo modelo;
    
    public VeiculoDTO() {
    }

    



}
