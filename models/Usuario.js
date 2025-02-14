const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Usuario = new Schema({
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    eAdmin: {
        type: Boolean,
        default: false
    }
});

mongoose.model("usuarios", Usuario);