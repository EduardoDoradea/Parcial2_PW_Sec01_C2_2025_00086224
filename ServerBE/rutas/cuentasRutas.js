
// importando el metodo router de express
import { Router } from "express";
// importando endpoints de la carpeta de controladores
import {
    getCuentas,
    getCuentaPorId,
    getCuentasBalance
} from "../controladores/cuentasControladores.js";

const router = Router();

// dependiendo de la ruta que tenga, se solicitara el metodo 
// para la parte 1
router.get("/cuentas", getCuentas);
router.get("/cuenta/:id", getCuentaPorId);
// para la parte 2
router.get("/cuentasBalance", getCuentasBalance);

export default router;

