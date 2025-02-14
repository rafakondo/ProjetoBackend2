const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Usuario");
const Usuario = mongoose.model("usuarios");
const bcryptjs = require("bcryptjs");

router.get("/criar-admin", (req,res) => {
    const salt = bcryptjs.genSaltSync(10);
    const hash = bcryptjs.hashSync("admin", salt);
    
    const newAdmin = {
        email: "admin@email.com",
        senha: hash,
        eAdmin: true
    }

    new Usuario(newAdmin).save().then((admin) => {
        return res.status(201).json({message: "Conta de administrador criada com sucesso", admin:admin});
    }).catch((error) => {
        return res.status(500).json({message: "Houve um erro no servidor, erro: "+error});
    })
})

// Rota para exibir a área de admin
router.get("/admin", (req, res) => {
    res.render("admin", { title: "Área Administrador" });
});

module.exports = router;