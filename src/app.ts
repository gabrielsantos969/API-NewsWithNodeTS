
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import newsRouter from './routes/newsRoutes';

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(helmet());

app.use(express.json());

app.use('/v1/news', newsRouter);

export default app;