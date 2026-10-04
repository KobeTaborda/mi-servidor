// Modelo: solo se encarga de hablar con la base de datos (consultas SQL)
const { pool } = require("../config/db");

const CAMPOS = "id, tipoDoc, numDoc, nombres, apellidos, direccion, ciudad, fechaNac, correo";

// Se usan consultas parametrizadas (?) para evitar inyección SQL
const UsuarioModel = {
    async getAll() {
        const [filas] = await pool.query(`SELECT ${CAMPOS} FROM usuarios ORDER BY id`);
        return filas;
    },

    async getById(id) {
        const [filas] = await pool.query(`SELECT ${CAMPOS} FROM usuarios WHERE id = ?`, [id]);
        return filas[0];
    },

    async getByDocumento(tipoDoc, numDoc) {
        const [filas] = await pool.query(
            `SELECT ${CAMPOS} FROM usuarios WHERE tipoDoc = ? AND numDoc = ?`,
            [tipoDoc, numDoc]
        );
        return filas[0];
    },

    async create(persona) {
        const [resultado] = await pool.query(
            `INSERT INTO usuarios (tipoDoc, numDoc, nombres, apellidos, direccion, ciudad, fechaNac, correo)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [persona.tipoDoc, persona.numDoc, persona.nombres, persona.apellidos,
             persona.direccion, persona.ciudad, persona.fechaNac, persona.correo]
        );
        return resultado.insertId;
    },

    async update(id, persona) {
        const [resultado] = await pool.query(
            `UPDATE usuarios
             SET tipoDoc = ?, numDoc = ?, nombres = ?, apellidos = ?, direccion = ?,
                 ciudad = ?, fechaNac = ?, correo = ?
             WHERE id = ?`,
            [persona.tipoDoc, persona.numDoc, persona.nombres, persona.apellidos,
             persona.direccion, persona.ciudad, persona.fechaNac, persona.correo, id]
        );
        return resultado.affectedRows;
    },

    async delete(id) {
        const [resultado] = await pool.query("DELETE FROM usuarios WHERE id = ?", [id]);
        return resultado.affectedRows;
    }
};

module.exports = UsuarioModel;
