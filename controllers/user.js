const { response, query } = require('express')
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/user')

const userGet = async( req, res = response ) => {

    const { limit = 5, desde = 0 } = req.query
    const query = { estado: true }

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments( query ),
        Usuario.find( query )
            .skip( Number( desde ) )
            .limit( Number( limit ) )
    ])

    res.json({
        total,
        usuarios
    }) 
}

const userPost = async( req, res = response ) => {

    const { nombre, correo, password, rol } = req.body
    const usuario = new Usuario({ nombre, correo, password, rol })

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync()                           //Con el genSaltSync dentro del parentesis el numero que se indica es que tan compleja se quiere la encriptacion
    usuario.password = bcryptjs.hashSync( password, salt )

    // Guardar BD
    await usuario.save()

    res.json({
        usuario
    })  
}

const userPut = async( req, res = response ) => {

    const { id } = req.params
    const { _id, password, google, correo, ...resto } = req.body

    //Validar contra base de datos
    if( password ) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync()
        resto.password = bcryptjs.hashSync( password, salt )
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto)

    res.json(usuario)  
}

const userDelete = async( req, res = response ) => {
    
    const { id } = req.params

    //Fisicamente
    //const usuario = await Usuario.findByIdAndDelete( id )

    //Actualizar estado
    const usuario = await Usuario.findByIdAndUpdate( id, {estado: 'false'} )

    res.json(usuario)
}

const userPatch =( req, res = response ) => {
    res.json({
        msg: 'patch API - Controller'
    }) 
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete,
    userPatch
}