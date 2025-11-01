import express from 'express';
import { json,urlencoded } from 'body-parser';
import cors from 'cors';
import config from './config';
import multer from "multer";
import routes from './routes';
import { errorHandler } from './utils/apiError';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

const app = express();

const limiter = rateLimit({
  windowMs: config.rate_limit_window_minutes() * 60 * 1000, 
  max: config.rate_limit_max_request(), 
  standardHeaders: true, 
  legacyHeaders: false, 
});

app.use(
  cors({
    origin: config.allowed_origins,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);

app.use(helmet());
app.use(limiter)
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
