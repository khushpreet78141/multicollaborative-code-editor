import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import roomRoutes from '../routes/roomRoutes.js';
import fileRoutes from '../routes/fileRoutes.js';
import authRoutes from '../routes/authRoutes.js';


const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/room", roomRoutes);
app.use("/api/file", fileRoutes);
app.use("/api/auth", authRoutes);
export default app;
