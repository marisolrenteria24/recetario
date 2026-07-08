const express = require("express");

const recetaRoutes = require("./routes/recetas");
const usuarioRoutes = require("./routes/usuarios");
const favoritoRoutes = require("./routes/favoritos");
const comentarioRoutes = require("./routes/comentarios");

const app = express();

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