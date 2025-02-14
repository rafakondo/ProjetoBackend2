const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Usuario");
const Usuario = mongoose.model("usuarios");
const bcryptjs = require("bcryptjs");
const SECRET = "rafakondosecret";
const jsonwebtoken = require("jsonwebtoken");

router.post("/", (req,res) => {
    const { email, senha } = req.body;

    if(!email) {
        return res.status(400).json({message: "Erro, o e-mail digitado é inválido"});
    }

    if(!senha) {
        return res.status(400).json({message: "Erro, a senha digitado é inválida"});
    }

    const salt = bcryptjs.genSaltSync(10);
    const hash = bcryptjs.hashSync(senha, salt);

    const newUser = {
        email: email,
        senha: hash
    }

    new Usuario(newUser).save().then((usuario) => {
        return res.status(201).json({meesage: "Conta criada", usuario:usuario});
    }).catch((error) => {
        return res.status(500).json({message: "Houve um erro no servidor, erro: "+error});
    })
});

router.post("/login", (req,res) => {
    const { email, senha } = req.body;

    if(!email) {
        return res.status(400).json({message: "Erro, o e-mail digitado é inválido"});
    }

    if(!senha) {
        return res.status(400).json({message: "Erro, a senha digitado é inválida"});
    }

    Usuario.findOne({email: email}).then((usuario) => {
        if(!usuario) {
            return res.status(404).json({message: "Usuario não encontrado"});
        }

        bcryptjs.compare(senha, usuario.senha, (err, senhaCorreta) => {
            if(err) {
                return res.status(400).json({message: "Erro ao verificar senha"});
            }

            if(senhaCorreta) {
                const token = jsonwebtoken.sign({idUser: usuario._id}, SECRET, {expiresIn: "1h"});
                return res.status(200).json({message: "Login feito", token: token});
            } else {
                return res.status(400).json({message: "Senha incorreta"});
            }
        })
    }).catch((error) => {
        return res.status(500).json({message: "Houve um erro no servidor, erro: "+error});
    })
});