import './src/database';
import express from 'express';
import dotenv from 'dotenv';
import homeRoutes from './src/routes/home_routes';
import userRoutes from './src/routes/user_routes';

dotenv.config();
class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/users/', userRoutes);
  }
}

export default new App().app;
