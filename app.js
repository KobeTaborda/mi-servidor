// Punto de entrada del servidor
const express = require("express");
const cors = require("cors");
require("dotenv").config({ quiet: true });

const sequelize = require("./config/database");
const usuarioRoutes = require("./routes/usuario.routes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());            // Permite que el formulario (frontend) consuma la API
app.use(express.json());    // Permite leer el body en formato JSON

// Rutas
app.get("/", (req, res) => {
    res.json({ mensaje: "API de usuarios funcionando" });
});
app.use("/usuarios", usuarioRoutes);

// Ruta no encontrada
app.use((req, res) => {
    res.status(404).json({ mensaje: "Ruta no encontrada" });
});

// Errores no controlados (por ejemplo, un JSON mal formado en el body)
app.use((err, req, res, next) => {
    if (err.type === "entity.parse.failed") {
        return res.status(400).json({ mensaje: "El cuerpo de la petición no es un JSON válido" });
    }
    console.error(err);
    res.status(500).json({ mensaje: "Error interno del servidor" });
});

// Conecta con la base de datos, crea la tabla "usuarios" si no existe (sync)
// e inicia el servidor solo si todo responde
sequelize.sync()
    .then(() => {
        console.log(`Base de datos conectada (${process.env.DB_TYPE || "mysql"})`);
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("No se pudo conectar a la base de datos:");
        console.error(error.original || error);
        process.exit(1);
    });
