
import app from "./app.js";
import { connectDB } from "./db.js";


//Primero nos conectamos a la base de datos
connectDB();

//Iniciamos el servidor 
app.listen(4000);
console.log("Servidor escuchando en el puerto: ", 4000);