import Express from "express";
import morgan from "morgan";
import authRoutes from './routes/auth.routes.js'
import taskRoutes from './routes/tasks.routes.js'
import cookieParser from "cookie-parser";
import cors from 'cors';

//lo ejecutamos y nos devuelve un objeto que guardamos en la const app
const app = Express();

//Morgan nos sirve para visulizar por consola las peticiones que llegan al servidor
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(morgan('dev'));
app.use(Express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", taskRoutes);

export default app;

