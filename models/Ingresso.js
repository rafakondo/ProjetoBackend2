const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Ingresso = new Schema({
    nome: {
        type: String,
        required: true
    },
    preco: {
        type: Number,
        required: true
    },
    quantidadeDisponivel: {
        type: Number,
        required: true
    }
});

mongoose.model("ingressos", Ingresso);