const jsonwebtoken = require("jsonwebtoken");
const mongoose = require("mongoose");
require("./models/Usuario");
const Usuario = mongoose.model("usuarios");
const SECRET = "rafakondosecret";

function authUser(req,res,next) {
    const token = req.headers.authentication;

    if(!token) {
        return res.status(404).json({message: "token não encontrado"});
    }

    jsonwebtoken.verify(token, SECRET, (err, decoded) => {
        if(err) {
            return res.status(401).json({message: "Erro ao verificar token"});
        }

        Usuario.findOne({_id: decoded.idUser}).then((usuario) => {
            if(!usuario) {
                return res.status(404).json({message: "Usuario nao encontrado"});
            }

            req.user = usuario;
            next();
        }).catch((error) => {
            return res.status(500).json({message: "Houve um erro no servidor, erro: "+error});
        })
    }).catch((error) => {
        return res.status(500).json({message: "Houve um erro no servidor, erro: "+error});
    })
}

function authAdmin(req,res,next) {
    const token = req.headers.authentication;

    if(!token) {
        return res.status(404).json({message: "token não encontrado"});
    }

    jsonwebtoken.verify(token, SECRET, (err, decoded) => {
        if(err) {
            return res.status(401).json({message: "Erro ao verificar token"});
        }

        Usuario.findOne({_id: decoded.idUser}).then((usuario) => {
            if(!usuario) {
                return res.status(404).json({message: "Usuario nao encontrado"});
            }

            if(usuario.eAdmin === false) {
                return res.status(401).json({message: "Apenas admins podem realizar esta acao"});
            }

            req.user = usuario;
            next();
        }).catch((error) => {
            return res.status(500).json({message: "Houve um erro no servidor, erro: "+error});
        })
    }).catch((error) => {
        return res.status(500).json({message: "Houve um erro no servidor, erro: "+error});
    })
}

module.exports = {
    authUser,
    authAdmin
}
