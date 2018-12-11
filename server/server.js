import express from 'express';
import redflagRoutes from './routers/router';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/v1', redflagRoutes);

app.listen(port, () => {
  console.log(`Server Started at port ${port}`);
});

// app.listen(port);

export default app;
