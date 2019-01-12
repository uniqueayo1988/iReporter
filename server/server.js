import express from 'express';
import dotenv from 'dotenv';
import 'babel-polyfill';
import cors from 'cors';
import userRoutes from './routers/userRouter';
import interventionRoutes from './routers/interventionRouter';
import redFlagRoutes from './routers/redFlagRouter';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use('/upload', express.static('upload'));

app.use(express.json());
app.use(cors());

app.use('/api/v1', userRoutes);
app.use('/api/v1', interventionRoutes);
app.use('/api/v1', redFlagRoutes);

app.listen(port, () => {
  console.log(`Server now started at port ${port}`);
});

export default app;
