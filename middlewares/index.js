

const validarCampos = require('../middlewares/validar-campos')
const validarJWT = require('../middlewares/validar-jwt')
const validarRol = require('../middlewares/validar-roles')

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validarRol
}