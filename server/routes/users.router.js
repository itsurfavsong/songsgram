/**
 * @file routes/users.router.js
 * @description the router of registration
 */

import express from 'express';
import validationHandler from '../app/middlewares/validations/validationHandler.js';
import storeValidator from '../app/middlewares/validations/validators/users/store.validator.js';
import usersController from '../app/controllers/users.controller.js';

const usersRouter = express.Router();

usersRouter.post('/', storeValidator, validationHandler, usersController.store);

export default usersRouter;
