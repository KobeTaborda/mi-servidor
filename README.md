# mi-servidor — Backend CRUD de usuarios

API REST en **Node.js + Express + MySQL** para el formulario de personas
(Tecnológico de Antioquia). Organizada en capas: rutas → controlador → servicio → modelo → base de datos.

## Estructura

```
mi-servidor/
├── config/db.js                     # Conexión a MySQL (pool)
├── controllers/usuario.controller.js # Recibe la petición y responde
├── models/usuario.model.js          # Consultas SQL
├── routes/usuario.routes.js         # Define las rutas /usuarios
├── services/usuario.service.js      # Validaciones y reglas de negocio
├── app.js                           # Punto de entrada
├── database.sql                     # Script de la base de datos
└── .env.example                     # Variables de entorno de ejemplo
```

## Cómo ejecutarlo

1. Crear la base de datos ejecutando `database.sql` en MySQL (Workbench, XAMPP/phpMyAdmin o consola).
2. Copiar `.env.example` como `.env` y poner el usuario y la contraseña de MySQL.
3. Instalar dependencias y arrancar:

```bash
npm install
npm start        # o npm run dev para reiniciar al guardar cambios
```

El servidor queda en `http://localhost:3000`.

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
