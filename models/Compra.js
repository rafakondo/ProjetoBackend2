const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Compra = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "usuarios"
    },
    ingressoId: {
        type: Schema.Types.ObjectId,
        ref: "ingressos"
    }
});

mongoose.model("compras", Compra);