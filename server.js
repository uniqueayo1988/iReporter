import express from 'express';

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.listen(port, () => {
  console.log(`Server Started at port ${port}`);
});

// app.listen(port);

module.exports = app;
