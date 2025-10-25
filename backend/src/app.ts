import express from 'express';
import { json,urlencoded } from 'body-parser';
import cors from 'cors';
import config from './config';
import multer from "multer";
import routes from './routes';
import { errorHandler } from './utils/apiError';

const app = express();

app.use(
  cors({
    origin: config.allowed_origins,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);

app.use(json());
app.use(urlencoded({ extended: true }));

const upload = multer({ storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 }
});


app.use("/api/v1", routes(upload));

app.use("/health",(req, res) => {
  res.status(200).json({ message: "Endpoint Working" });
});
// 5) 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.use(errorHandler);

export default app;
