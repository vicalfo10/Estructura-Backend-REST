const Role = require('../models/rol')
const Usuario = require('../models/user')

// Verificar si el rol no esta registrado en BD
const esRoleValido = async( rol = '' ) => {
    const existeRol = await Role.findOne({ rol })
    if( !existeRol ) {
        throw new Error( `El rol ${ rol } no está registrado en la Base de datos` )
    }
}

// Verificar si el correo existe en BD
const emailValido = async( correo = '') => {
    const existeEmail = await Usuario.findOne({ correo })
    if( existeEmail ) {
        throw new Error( `El correo: ${ correo } ya esta registrado` )
    }
}

const existeUsuarioID = async( id ) => {
    const existeUsuario = await Usuario.findById(id)
    if( !existeUsuario ) {
        throw new Error( `El id: ${ id } no existe` )
    }
}

module.exports = {
    esRoleValido,
    emailValido,
    existeUsuarioID
}