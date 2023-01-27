import express from 'express';
import mongoose from 'mongoose';

import { router } from './router';


mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017')
  .then(() => {
    const app = express();
    const port = 3001;

    app.use(router);

    app.listen(port, () => {
      console.log(`🚀 Server is running on http://localhost:${port}`);
    });
  })
  .catch(() => {
    console.log('🛑 Erro ao conectar ao mongo');
  });


