# mi-servidor — Backend CRUD de usuarios

API REST en **Node.js + Express + Sequelize (ORM)** para el formulario de personas
(Tecnológico de Antioquia). Funciona con **MySQL o SQL Server** cambiando una sola variable.
Organizada en capas: rutas → controlador → servicio → modelo (Sequelize) → base de datos.

## Estructura

```
mi-servidor/
├── config/database.js                # Conexión con Sequelize (único punto de cambio de motor)
├── controllers/usuario.controller.js # Recibe la petición y responde
├── models/usuario.model.js           # Modelo Sequelize de la tabla usuarios (reemplaza el SQL)
├── routes/usuario.routes.js          # Define las rutas /usuarios
├── services/usuario.service.js       # Validaciones y reglas de negocio
├── app.js                            # Punto de entrada
├── database.sql                      # Script opcional para crear la base de datos en MySQL
└── .env.example                      # Variables de entorno de ejemplo
```

## Cómo ejecutarlo

1. Crear la base de datos vacía (por ejemplo `formulario_db`). En MySQL se puede ejecutar `database.sql`;
   en SQL Server hay que crearla a mano. La tabla `usuarios` la crea Sequelize sola al iniciar (`sync()`).
2. Copiar `.env.example` como `.env` y poner el motor, el usuario, la contraseña y el nombre de la base.
3. Instalar dependencias y arrancar:

```bash
npm install
npm start        # o npm run dev para reiniciar al guardar cambios
```

El servidor queda en `http://localhost:3000`.

> `sync()` solo crea la tabla si no existe; si ya existe con otras columnas no la modifica.
> En ese caso hay que borrar la tabla `usuarios` y volver a iniciar el servidor.

## Cambiar de base de datos

Solo se cambia `DB_TYPE` en el archivo `.env` (el código no se toca):

```
DB_TYPE=mysql     # MySQL  (puerto 3306 por defecto)
DB_TYPE=mssql     # SQL Server (puerto 1433 por defecto)
```

Limitaciones: cada motor tiene diferencias internas, los tipos de datos pueden variar y
las funciones SQL propias de un motor no son portables.

## Endpoints

| Método | Ruta            | Descripción               |
|--------|-----------------|---------------------------|
| GET    | /usuarios       | Listar                    |
| GET    | /usuarios/:id   | Obtener uno               |
| POST   | /usuarios       | Crear                     |
| PUT    | /usuarios/:id   | Actualizar                |
| DELETE | /usuarios/:id   | Eliminar                  |

Ejemplo de body para POST/PUT:

```json
{
  "tipoDoc": "CC",
  "numDoc": "123456",
  "nombres": "Kobe",
  "apellidos": "Taborda",
  "direccion": "Calle 1",
  "ciudad": "Medellin",
  "fechaNac": "2000-03-21",
  "correo": "kobe@correo.co"
}
```

Respuestas de error: `400` datos inválidos, `404` no existe, `409` documento duplicado.
