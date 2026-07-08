const express = require("express");

const recetaRoutes = require("./routes/recetas");
const usuarioRoutes = require("./routes/usuarios");
const favoritoRoutes = require("./routes/favoritos");
const comentarioRoutes = require("./routes/comentarios");

const app = express();

// Permitir que el frontend consuma la API desde otro puerto o desde un archivo HTML.
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }

    next();
});

// Middleware para recibir JSON
app.use(express.json());

// Ruta principal
app.get("/", (req, res) => {
    res.json({
        mensaje: "API del Recetario funcionando correctamente"
    });
});

// Rutas de la API
app.use("/api/recetas", recetaRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/favoritos", favoritoRoutes);
app.use("/api/comentarios", comentarioRoutes);

// Puerto del servidor
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});