const { response } = require("express");
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/user');
const { generarJWT } = require("../helpers/generarJWT");

const login = async(req, res = response) => {

    const {correo, password } = req.body

    try {

        // Verificar si el email existe
        const usuario = await Usuario.findOne({ correo })
        
        if ( !usuario ) {
            return res.status(400).json({
                msg: 'Usuario / Pasword no son corrects - correo'
            })
        }

        // Si el usuario esta activo
        if ( !usuario.estado ) {
            return res.status(400).json({
                msg: 'Usuario / Pasword no son corrects - estado: false'
            })
        }

        // Verificar constraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password )
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'Usuario / Pasword no son corrects - password'
            }) 
        }

        // Genierar el JWT
        const token = await generarJWT( usuario.id )

        res.json({
            usuario,
            token
        })
        
    } catch (error) {
        console.log(err)
        return res.status(500).json({
            msg: 'Hable con el adminitrador'
        })   
    }
}

module.exports = {
    login
};