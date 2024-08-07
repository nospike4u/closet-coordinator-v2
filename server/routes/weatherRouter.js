import { Router } from 'express';
import { weatherChat } from '../controllers/weatherAPI.js';

const weatherRouter = Router();

weatherRouter.get('/', weatherChat);

export default weatherRouter;
