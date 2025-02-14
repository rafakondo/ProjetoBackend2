const express = require("express");
const router = express.Router();

// Login
router.get("/login", (req, res) => {
    res.render("login", { title: "Login" });
});


// Historico de compras
router.get("/historico", (req, res) => {
    const comprasFake = [
        { id: 1, nome: "Ingresso VIP", preco: "R$ 200,00", quantidade: 2 },
        { id: 2, nome: "Pista", preco: "R$ 100,00", quantidade: 1 },
    ];
    res.render("historico", { title: "Histórico de Compras", compras: comprasFake });
});


// Visualizaçao de ingresso
router.get("/ingresso/:id", (req, res) => {
    const ingressoFake = {
        id: req.params.id,
        nome: "Ingresso VIP",
        preco: "R$ 200,00",
        quantidade: 2,
    };
    res.render("ingresso", ingressoFake);
});


module.exports = router;
