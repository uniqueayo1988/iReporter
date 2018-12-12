import express from 'express';
import dotenv from 'dotenv';
import 'babel-polyfill';
import userRoutes from './routers/userRouter';
import interventionRoutes from './routers/interventionRouter';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/v1', userRoutes);
app.use('/api/v1', interventionRoutes);

app.listen(port, () => {
  console.log(`Server now started at port ${port}`);
});

export default app;
