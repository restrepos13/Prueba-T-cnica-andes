import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { connectDb } from './database.js';
import userRoutes from "./routes/user.routes.js";
connectDb();

const app = express();

app.set('Port', 4000);
app.use(morgan('dev'));
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/user",userRoutes);

app.listen(app.get('Port'), () => {console.log('Escuchando por el puerto', app.get('Port'));});
