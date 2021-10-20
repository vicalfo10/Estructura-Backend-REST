const { Router, response } = require('express')
const { check } = require('express-validator')

const { esRoleValido, emailValido, existeUsuarioID } = require('../helpers/db-validatos')
const { validarCampos } = require('../middlewares/Validar-campos')

const { userGet,
        userPost,
        userPut,
        userDelete,
        userPatch } = require('../controllers/user')
 
const router = Router()

router.get( '/', userGet )

router.put( '/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioID ),
    check('rol').custom( esRoleValido ),
    validarCampos
], userPut )

router.post( '/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y mayor a 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom( emailValido ),
    //check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( esRoleValido ),
    validarCampos
], userPost )

router.delete( '/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioID ),
    validarCampos
], userDelete )

router.patch( '/', userPatch )

module.exports = router