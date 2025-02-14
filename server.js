const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

// Middleware para processar formulários
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração do Handlebars
app.engine("hbs", exphbs.engine({ extname: ".hbs", defaultLayout: "main" }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Rotas
const frontendRoutes = require("./routes/frontend");
app.use("/", frontendRoutes);

// Iniciar o servidor
app.listen(3000, () => console.log("Servidor rodando em http://localhost:3000"));
