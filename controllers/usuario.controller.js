// Controlador: recibe la petición HTTP, llama al servicio y devuelve la respuesta
const UsuarioService = require("../services/usuario.service");

// Respuesta de error común para todos los métodos
function manejarError(res, error) {
    if (error.status) {
        return res.status(error.status).json({ mensaje: error.message });
    }
    console.error(error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
}

const UsuarioController = {
    async getAll(req, res) {
        try {
            const usuarios = await UsuarioService.getAll();
            res.json(usuarios);
        } catch (error) {
            manejarError(res, error);
        }
    },

    async getById(req, res) {
        try {
            const usuario = await UsuarioService.getById(req.params.id);
            res.json(usuario);
        } catch (error) {
            manejarError(res, error);
        }
    },

    async create(req, res) {
        try {
            const usuario = await UsuarioService.create(req.body);
            res.status(201).json(usuario);
        } catch (error) {
            manejarError(res, error);
        }
    },

    async update(req, res) {
        try {
            const usuario = await UsuarioService.update(req.params.id, req.body);
            res.json(usuario);
        } catch (error) {
            manejarError(res, error);
        }
    },

    async delete(req, res) {
        try {
            await UsuarioService.delete(req.params.id);
            res.json({ mensaje: "Usuario eliminado" });
        } catch (error) {
            manejarError(res, error);
        }
    }
};

module.exports = UsuarioController;
