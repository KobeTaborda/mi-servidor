// Modelo: define la estructura de la tabla "usuarios" con Sequelize (ORM).
// Ya no se escribe SQL a mano: Sequelize genera las consultas según el motor configurado.
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Usuario = sequelize.define("Usuario", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tipoDoc: { type: DataTypes.STRING(2), allowNull: false },
    numDoc: { type: DataTypes.STRING(20), allowNull: false },
    nombres: { type: DataTypes.STRING(100), allowNull: false },
    apellidos: { type: DataTypes.STRING(100), allowNull: false },
    direccion: { type: DataTypes.STRING(150) },
    ciudad: { type: DataTypes.STRING(50) },
    // DATEONLY devuelve la fecha como texto "AAAA-MM-DD" (lo que espera el input type="date")
    fechaNac: { type: DataTypes.DATEONLY, allowNull: false },
    correo: { type: DataTypes.STRING(120), allowNull: false }
}, {
    tableName: "usuarios",
    timestamps: false,
    indexes: [
        // Una persona se identifica por tipo + número de documento (igual que en el formulario)
        { name: "uq_documento", unique: true, fields: ["tipoDoc", "numDoc"] }
    ]
});

module.exports = Usuario;
