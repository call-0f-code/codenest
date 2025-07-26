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
    origin: config.allowed_origins.split(","),
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);

app.use(json());
app.use(urlencoded({ extended: true }));

const upload = multer({ storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 }
});

// 4) Mount your routes, injecting `upload` middleware where needed
//    For endpoints that accept file uploads, you can do e.g.:
//    router.post('/members/:memberId/photo', upload.single('photo'), ...)

app.use("/api/v1", routes(upload));

// 5) 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.use(errorHandler);

export default app;