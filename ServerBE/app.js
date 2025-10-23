//app principal
/*
Nombre: Eduardo Jose Melendez Doradea
Carnet: 00086224
Seccion 1
*/ 
// importamos el express
import express from "express";
// importamos las rutas que se utilizaran para los endpoints
import cuentasRouter from "./rutas/cuentasRutas.js";

const app = express();
const PORT = 3130; // Puerto solicitado

app.use(express.json());

app.use("/",
    (req, res, next) => { res.setHeader("X-Powered-By", "Express"); next(); },
    cuentasRouter
);

// Error 404 para rutas que no esten definidas 
app.use((req, res) => {
    res.status(404).json({ message: "Ruta no encontrada" });
});
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
