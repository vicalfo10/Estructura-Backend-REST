const { response, query } = require('express')

const userGet = ( req, res = response ) => {

    const { q, nombre = 'No name', apikey, page = 1, limit } = req.query

    res.json({
        msg: 'get API - Controller',
        q,
        nombre,
        apikey,
        page,
        limit
    })  
}

const userPost = ( req, res = response ) => {

    const { nombre, edad } = req.body

    res.json({
        msg: 'post API - Controller',
        nombre,
        edad
    })  
}

const userPut = ( req, res = response ) => {

    const { id } = req.params.id

    res.json({
        msg: 'put API - Controller'
    })  
}

const userDelete = ( req, res = response ) => {
    res.json({
        msg: 'delete API - Controller'
    })
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