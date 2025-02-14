const jsonwebtoken = require("jsonwebtoken");
const mongoose = require("mongoose");
require("./models/Usuario");
const Usuario = mongoose.model("usuarios");
const SECRET = "rafakondosecret";

function authUser(req,res,next) {
    const token = req.cookies.token;

    if(!token) {
        req.flash("erro", "Erro, faça login novamente")
        return res.redirect("/");

    }

    jsonwebtoken.verify(token, SECRET, (err, decoded) => {
        if(err) {
            req.flash("erro", "Erro ao verificar token")
            return res.redirect("/");
        }

        Usuario.findOne({_id: decoded.idUser}).then((usuario) => {
            if(!usuario) {
                req.flash("erro", "Usuario nao encontrado")
                return res.redirect("/");
            }

            req.user = usuario;
            next();
        }).catch((error) => {
            return res.status(500).json({message: "Houve um erro no servidor, erro: "+error});
        })
    })
}

function authAdmin(req,res,next) {
    const token = req.cookies.token;

    if(!token) {
        req.flash("erro", "Erro, faça login novamente")
        return res.redirect("/");
    }

    jsonwebtoken.verify(token, SECRET, (err, decoded) => {
        if(err) {
            req.flash("erro", "Erro ao verificar token")
            return res.redirect("/");
        }

        Usuario.findOne({_id: decoded.idUser}).then((usuario) => {
            if(!usuario) {
                req.flash("erro", "Usuario nao encontrado")
                return res.redirect("/");
            }

            if(usuario.eAdmin === false) {
                req.flash("erro", "Apenas admins podem realizar esta acao")
                return res.redirect("/");
            }

            req.user = usuario;
            next();
        }).catch((error) => {
            return res.status(500).json({message: "Houve um erro no servidor, erro: "+error});
        })
    })
}

module.exports = {
    authUser,
    authAdmin
}
