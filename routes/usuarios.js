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

router.get("/login", (req, res) => {
    res.render("login", { title: "Login" });
});

router.post("/login", (req,res) => {
    const { email, senha } = req.body;

    if(!email) {
        req.flash("error", "Erro, o e-mail digitado é inválido");
        return res.redirect("/users/login");
    }

    if(!senha) {
        req.flash("error", "Erro, a senha digitada é inválida");
        return res.redirect("/users/login");
    }

    Usuario.findOne({email: email}).then((usuario) => {
        if(!usuario) {
            req.flash("error", "Usuário não encontrado");
            return res.redirect("/users/login");
        }

        bcryptjs.compare(senha, usuario.senha, (err, senhaCorreta) => {
            if(err) {
                req.flash("error", "Erro ao verificar senha");
                return res.redirect("/users/login");
            }

            if(senhaCorreta) {
                const token = jsonwebtoken.sign({idUser: usuario._id}, SECRET, {expiresIn: "1h"});
                res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });
                req.flash("success", "Login realizado com sucesso!");
                return res.redirect("/");
            } else {
                req.flash("error", "Senha incorreta");
                return res.redirect("/users/login");
            }
        })
    }).catch((error) => {
        return res.status(500).json({message: "Houve um erro no servidor, erro: "+error});
    })
});

module.exports = router