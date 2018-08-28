import express from 'express';

import {
  newUsers,
  logInUser,
  getAllUsers,
} from './../middleware/users';

const userRoutes = express.Router();

userRoutes.post('/auth/signup', newUsers);
userRoutes.get('/auth/signup', getAllUsers);
userRoutes.post('/auth/login', logInUser);

export default userRoutes;
