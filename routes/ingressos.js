const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Ingresso");
const Ingresso = mongoose.model("ingressos");
const authenticate = require("../authenticate");

router.post("/", authenticate.authAdmin, (req,res) => {
    const { nome, preco, quantidadeDisponivel } = req.body;

    if(!nome) {
        return res.status(400).json({message: "Erro, nome de ingresso invalido"});
    }

    if(!preco) {
        return res.status(400).json({message: "Erro, preço de ingresso invalido"});
    }

    if(!quantidadeDisponivel) {
        return res.status(400).json({message: "Erro, quantidade disponivel de ingresso invalida"});
    }

    if(quantidadeDisponivel < 0) {
        return res.status(400).json({message: "Erro, quantidade disponivel de ingresso invalida"});
    }

    const newIngresso = {
        nome: nome,
        preco: preco,
        quantidadeDisponivel: quantidadeDisponivel
    }

    new Ingresso(newIngresso).save().then((ingresso) => {
        return res.status(201).json({message: "Ingresso adicionado", ingresso:ingresso});
    }).catch((error) => {
        return res.status(500).json({message: "Houve um erro no servidor, erro: "+error});
    })
});

router.get("/", (req,res) => {
    Ingresso.find().then((ingressos) => {
        return res.render("home", {
            ingressos: ingressos
        })
    }).catch((error) => {
        return res.status(500).json({message: "Houve um erro no servidor, erro: "+error});
    })
})

router.put("/:id", authenticate.authAdmin, (req,res) => {
    const { nome, preco, quantidadeDisponivel } = req.body;
    
    if(!nome) {
        return res.status(400).json({message: "Erro, nome de ingresso invalido"});
    }

    if(!preco) {
        return res.status(400).json({message: "Erro, preço de ingresso invalido"});
    }

    if(!quantidadeDisponivel) {
        return res.status(400).json({message: "Erro, quantidade disponivel de ingresso invalida"});
    }

    if(quantidadeDisponivel < 0) {
        return res.status(400).json({message: "Erro, quantidade disponivel de ingresso invalida"});
    }

    Ingresso.findOne({_id: req.params.id}).then((ingresso) => {
        if(!ingresso) {
            return res.status(404).json({message: "Ingresso nao encontrado"});
        }

        ingresso.nome = nome;
        ingresso.preco = preco;
        ingresso.quantidadeDisponivel = quantidadeDisponivel;

        ingresso.save().then((ingressoEditado) => {
            return res.status(200).json({message: "Ingresso editado"});
        }).catch((error) => {
            return res.status(500).json({message: "Houve um erro no servidor, erro: "+error});
        })
    }).catch((error) => {
        return res.status(500).json({message: "Houve um erro no servidor, erro: "+error});
    })
});

router.delete("/:id", authenticate.authAdmin, (req,res) => {
    Ingresso.deleteOne({_id: req.params.id}).then(() => {
        return res.status(200).json({message: "Ingresso excluido"});
    }).catch((error) => {
        return res.status(500).json({message: "Houve um erro no servidor, erro: "+error});
    })
})

module.exports = router;