// Conexión a la base de datos con Sequelize (ORM).
// ÚNICO punto de cambio de motor: DB_TYPE=mysql | mssql (se define en el archivo .env)
const { Sequelize } = require("sequelize");

const DB_TYPE = (process.env.DB_TYPE || "mysql").toLowerCase();

const motores = {
    mysql: { dialect: "mysql", puerto: 3306 },
    mssql: {
        dialect: "mssql",
        puerto: 1433,
        dialectOptions: { options: { encrypt: false } }
    }
};

const motor = motores[DB_TYPE];
if (!motor) {
    throw new Error(`DB_TYPE inválido: "${DB_TYPE}". Use "mysql" o "mssql".`);
}

const sequelize = new Sequelize(
    process.env.DB_NAME || "formulario_db",
    process.env.DB_USER || "root",
    process.env.DB_PASSWORD || "",
    {
        host: process.env.DB_HOST || "localhost",
        port: Number(process.env.DB_PORT) || motor.puerto,
        dialect: motor.dialect,
        dialectOptions: motor.dialectOptions,
        logging: false
    }
);

module.exports = sequelize;
