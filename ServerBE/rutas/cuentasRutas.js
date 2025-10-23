
// importando el metodo router de express
import { Router } from "express";
// importando endpoints de la carpeta de controladores
import {
    getCuentas,
    getCuentaPorId,
    getCuentasBalance
} from "../controladores/cuentasControladores.js";

const router = Router();

router.get("/cuentas", getCuentas);
router.get("/cuenta/:id", getCuentaPorId);
router.get("/cuentasBalance", getCuentasBalance);

export default router;

