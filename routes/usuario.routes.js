// Rutas (/usuarios): asocia cada URL y método HTTP con su función del controlador
const express = require("express");
const UsuarioController = require("../controllers/usuario.controller");

const router = express.Router();

// Valida que el :id sea un número antes de llegar al controlador
router.param("id", (req, res, next, id) => {
    if (!/^\d+$/.test(id)) {
        return res.status(400).json({ mensaje: "El id debe ser numérico" });
    }
    next();
});

router.get("/", UsuarioController.getAll);        // Listar
router.get("/:id", UsuarioController.getById);    // Obtener uno
router.post("/", UsuarioController.create);       // Crear
router.put("/:id", UsuarioController.update);     // Actualizar
router.delete("/:id", UsuarioController.delete);  // Eliminar

module.exports = router;
