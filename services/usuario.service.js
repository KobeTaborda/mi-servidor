// Servicio: contiene la lógica de negocio (validaciones y reglas)
const UsuarioModel = require("../models/usuario.model");

const TIPOS_DOC = ["CC", "TI", "CE", "PA"];
const REGEX_CORREO = /^[^\s@,;]+@[^\s@,;]+\.[a-zA-Z]{2,}$/;

// Error con código HTTP para que el controlador sepa qué responder
class ErrorServicio extends Error {
    constructor(mensaje, status) {
        super(mensaje);
        this.status = status;
    }
}

// Limpia los datos que llegan del formulario y valida los campos obligatorios
function validarPersona(datos = {}) {
    const persona = {
        tipoDoc: String(datos.tipoDoc || "").trim(),
        numDoc: String(datos.numDoc || "").trim(),
        nombres: String(datos.nombres || "").trim(),
        apellidos: String(datos.apellidos || "").trim(),
        direccion: String(datos.direccion || "").trim(),
        ciudad: String(datos.ciudad || "").trim(),
        fechaNac: String(datos.fechaNac || "").trim(),
        correo: String(datos.correo || "").trim()
    };

    const errores = [];
    if (!TIPOS_DOC.includes(persona.tipoDoc)) errores.push("Tipo de documento no válido");
    if (!/^\d{1,20}$/.test(persona.numDoc)) errores.push("El número de documento debe ser numérico");
    if (!persona.nombres) errores.push("Los nombres son obligatorios");
    if (!persona.apellidos) errores.push("Los apellidos son obligatorios");
    if (!/^\d{4}-\d{2}-\d{2}$/.test(persona.fechaNac) || isNaN(Date.parse(persona.fechaNac))) {
        errores.push("La fecha de nacimiento no es válida");
    } else if (new Date(persona.fechaNac) > new Date()) {
        errores.push("La fecha de nacimiento no puede ser futura");
    }
    if (!REGEX_CORREO.test(persona.correo)) errores.push("El correo no es válido");

    if (errores.length > 0) {
        throw new ErrorServicio(errores.join(". "), 400);
    }
    return persona;
}

const UsuarioService = {
    async getAll() {
        return UsuarioModel.getAll();
    },

    async getById(id) {
        const persona = await UsuarioModel.getById(id);
        if (!persona) throw new ErrorServicio("Usuario no encontrado", 404);
        return persona;
    },

    async create(datos) {
        const persona = validarPersona(datos);

        const existe = await UsuarioModel.getByDocumento(persona.tipoDoc, persona.numDoc);
        if (existe) throw new ErrorServicio("Ya existe un usuario con ese documento", 409);

        const id = await UsuarioModel.create(persona);
        return { id, ...persona };
    },

    async update(id, datos) {
        await this.getById(id); // lanza 404 si no existe
        const persona = validarPersona(datos);

        // Evita que al actualizar se use el documento de otra persona
        const otro = await UsuarioModel.getByDocumento(persona.tipoDoc, persona.numDoc);
        if (otro && otro.id !== Number(id)) {
            throw new ErrorServicio("Ese documento ya pertenece a otro usuario", 409);
        }

        await UsuarioModel.update(id, persona);
        return { id: Number(id), ...persona };
    },

    async delete(id) {
        const filas = await UsuarioModel.delete(id);
        if (filas === 0) throw new ErrorServicio("Usuario no encontrado", 404);
    }
};

module.exports = UsuarioService;
