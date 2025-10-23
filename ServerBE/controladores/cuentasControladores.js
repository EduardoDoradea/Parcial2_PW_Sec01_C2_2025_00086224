
//IMPORTANDO LOS OBJETOS DE LA CARPETA DATA 
import { cuentas } from "../data/cuentasData.js";

//endpoint para hacer el cuentas balance 
export const getCuentasBalance = (req, res) => {
    try {
        const cuentasActivas = cuentas.filter(cuenta => cuenta.isActive === true);
        const status = cuentasActivas.length > 0;

        const totalBalance = cuentasActivas.reduce((acumulador, cuenta) => {
            const balanceLimpio = cuenta.balance.replace("$", "").replace(",", "");
            const balanceNumerico = parseFloat(balanceLimpio);
            return acumulador + balanceNumerico;
        }, 0);

        res.status(200).json({
            status: status,
            accountBalance: totalBalance.toFixed(2)
        });

    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
};

//endpoint para filtrar por id 
export const getCuentaPorId = (req, res) => {
    try {
        const { id } = req.params;
        const account = cuentas.find((c) => c._id === id);

        if (account) {
            res.status(200).json({
                finded: true,
                account: account
            });
        } else {
            res.status(404).json({
                finded: false,
                account: null,
                message: "Cuenta no encontrada"
            });
        }
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
};

//Endpoint para cuentas, por medio del id, estado del cliente, y genero este es el endpoint para las distintas querys 
export const getCuentas = (req, res) => {
    const { _id, client, gender } = req.query;

    try {
        if (_id) {
            const cuenta = cuentas.find(c => c._id === _id);
            return cuenta
                ? res.status(200).json({ finded: true, account: cuenta })
                : res.status(404).json({ finded: false, message: "Cuenta no encontrada" });
        }

        if (client) {
            const cuenta = cuentas.find(c => c.client.toLowerCase() === client.toLowerCase());
            return cuenta
                ? res.status(200).json({ finded: true, account: cuenta })
                : res.status(404).json({ finded: false, message: "Cuenta no encontrada" });
        }

        if (gender) {
            const cuentasFiltradas = cuentas.filter(c => c.gender.toLowerCase() === gender.toLowerCase());
            return cuentasFiltradas.length > 0
                ? res.status(200).json({ finded: true, data: cuentasFiltradas })
                : res.status(404).json({ finded: false, message: "No se encontraron cuentas con ese género" });
        }

        res.status(200).json({
            count: cuentas.length,
            data: cuentas
        });

    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
};
