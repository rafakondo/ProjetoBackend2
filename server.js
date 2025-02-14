const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoutes = require("./routes/usuarios");

const app = express();

//mongoose
mongoose.connect("mongodb+srv://rafaelkondobueno:OtlevAk6jTC0ZNzW@cluster0.s8qoo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(() => {
    console.log("Conectado ao banco de dados com sucesso!!!");
}).catch((erro) => {
    console.log("Erro ao se conectar ao banco de dados, erro: "+ erro);
})

// Middleware para processar formulários
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuração do Handlebars
app.engine("hbs", exphbs.engine({ extname: ".hbs", defaultLayout: "main" }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Rotas
app.use("/users", userRoutes);

app.get("/", (req, res) => {
    res.render("home", { title: "Ingressos Disponíveis"});
});

// Iniciar o servidor
app.listen(3000, () => console.log("Servidor rodando em http://localhost:3000"));
