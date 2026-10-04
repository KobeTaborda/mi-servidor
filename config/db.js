// Configuración de la conexión a MySQL
const mysql = require("mysql2/promise");

// Se usa un pool para reutilizar conexiones en vez de abrir una por cada petición
const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "formulario_db",
    waitForConnections: true,
    connectionLimit: 10,
    // Devuelve las fechas como texto "AAAA-MM-DD" para que el input type="date" las muestre bien
    dateStrings: true
});

// Verifica la conexión al iniciar el servidor
async function probarConexion() {
    const conexion = await pool.getConnection();
    console.log("Conectado a la base de datos MySQL");
    conexion.release();
}

module.exports = { pool, probarConexion };
