import express from "express";
import cors from 'cors';
import { env } from '@/env';
import { errorHandler } from '@/middlewares/error-handler';
import { loggingHandler } from '@/middlewares/logging-handler';
import { auth } from '@/lib/auth';
import { toNodeHandler } from 'better-auth/node';
import challengeRouter from '@/modules/challenge/challenge.routes';
import submissionRouter from '@/modules/submission/submissions.routes';
import statsRouter from "@/modules/stats/stats.routes";

const app = express();

// Add logging middleware first to catch all requests
app.use(loggingHandler);

app.use(cors({
  origin: [env.APP_ORIGIN, "https://umurava-edtech.vercel.app"],
  maxAge: 600,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Set-Cookie', 'Cookie'],
  exposedHeaders: ['Set-Cookie'],
}));

// Trust proxy is needed for secure cookies behind a proxy (like in production)
if (env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

app.all(`${env.BASE_PATH}/auth/*`, toNodeHandler(auth));

app.use(express.json());

app.use(`${env.BASE_PATH}/challenges`, challengeRouter);
app.use(`${env.BASE_PATH}/submissions`, submissionRouter);
app.use(`${env.BASE_PATH}/stats`, statsRouter);

app.use(errorHandler);
app.listen(env.PORT, () => {
  console.log(`Server is running on Port ${env.PORT} in ${env.NODE_ENV}`);
});