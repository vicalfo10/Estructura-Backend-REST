const { Router } = require('express')
const { check } = require('express-validator')

/*const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')
const { esAdminRole, tieneRole } = require('../middlewares/validar-roles')*/

const { validarCampos,
        validarJWT,
        esAdminRole,
        tieneRole } = require('../middlewares')

const { esRoleValido, emailValido, existeUsuarioID } = require('../helpers/db-validatos')

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
    validarJWT,
    //esAdminRole,                                                          //Solo un usuario con el rol de ADMIN lo puede borrar.
    tieneRole( 'ADMIN_ROLE', 'VENTAS_ROLE' ),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioID ),
    validarCampos
], userDelete )

router.patch( '/', userPatch )

module.exports = router